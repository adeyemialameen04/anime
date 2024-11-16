import { type NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "./jwt";
import { ACCESS_JWT_KEY, HTTP_STATUS, REFRESH_JWT_KEY } from "../constants";
import makeFetch from "../helpers/fetch";
import type { ApiResponse } from "@/types/unwind";

const DEFAULT_OFFSET_SECONDS = 15;

interface TokenPair {
	accessToken: string;
	refreshToken: string;
}

export function getMiddleware({
	shouldRefresh,
	fetchTokenPair,
	onSuccess,
	onError,
}: {
	shouldRefresh: (req: NextRequest) => Promise<boolean>;
	fetchTokenPair: (req: NextRequest) => Promise<TokenPair>;
	onSuccess: (tokenPair: TokenPair) => void;
	onError?: (req: NextRequest, res: NextResponse, error: unknown) => void;
}) {
	return function withRefreshToken(
		middleware: (req: NextRequest) => Promise<NextResponse>,
	) {
		return async (req: NextRequest): Promise<Response> => {
			try {
				if (await shouldRefresh(req)) {
					console.log("Refreshing token");
					const tokenPair = await fetchTokenPair(req);
					const response = onSuccess(tokenPair);

					// Call the main middleware function
					const middlewareResponse = await middleware(req);

					// Merge the headers from both responses
					const mergedHeaders = new Headers(middlewareResponse.headers);
					for (const [key, value] of response.headers.entries()) {
						mergedHeaders.set(key, value);
					}

					// Create a new response with merged headers
					return new Response(middlewareResponse.body, {
						status: middlewareResponse.status,
						statusText: middlewareResponse.statusText,
						headers: mergedHeaders,
					});
				}
			} catch (error) {
				console.error("Error in token refresh:", error);
				if (onError) {
					return onError(req, error);
				}
			}

			// If no refresh was needed or it failed, just call the main middleware
			return middleware(req);
		};
	};
}

export const withRefreshToken = getMiddleware({
	shouldRefresh: async (req) => {
		console.log("Checking if token should be refreshed");
		const accessToken = req.cookies.get("accessToken")?.value;
		if (!accessToken) return true;
		try {
			const payload = await decodeJwt(accessToken, ACCESS_JWT_KEY);
			if (!payload || !("expires" in payload)) {
				console.log("No expiry in token");
				return false;
			}
			return (
				payload &&
				"expires" in payload &&
				payload.expires - DEFAULT_OFFSET_SECONDS <= Date.now() / 1000
			);
		} catch {
			return true;
		}
	},
	fetchTokenPair: async (req) => {
		console.log("Fetching new token pair");
		const refreshToken = req.cookies.get("refreshToken")?.value;
		if (!refreshToken) {
			throw new Error("Refresh token not valid");
		}

		if (!decodeJwt(refreshToken as string, REFRESH_JWT_KEY)) {
			throw new Error("Refresh token not valid");
		}

		const response = await makeFetch<ApiResponse<TokenPair>>(
			"unwind",
			"/auth/refresh",
			refreshToken,
		)();
		if (response.status !== HTTP_STATUS.OK) {
			throw new Error(`Failed to refresh token: ${response.status}`);
		}
		return response.data;
	},
	onSuccess: (tokenPair) => {
		console.log("Setting new access token");
		const cookieValue = `accessToken=${tokenPair.accessToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=900; Path=/`;
		return new Response(null, {
			status: 200,
			headers: {
				"Set-Cookie": cookieValue,
			},
		});
	},

	onError: (req, _, error) => {
		console.error("Error in refresh token process:", error);
		if (error) {
			return NextResponse.redirect(new URL("/auth", req.url));
		}
	},
});
