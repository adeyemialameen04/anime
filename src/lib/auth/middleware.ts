import { type NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "./jwt";
import { UNWIND_API_BASE_URL } from "../constants";

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
	onSuccess: (res: NextResponse, tokenPair: TokenPair) => void;
	onError?: (req: NextRequest, res: NextResponse, error: unknown) => void;
}) {
	return function withRefreshToken(
		middleware: (req: NextRequest) => Promise<NextResponse>,
	) {
		return async (req: NextRequest): Promise<NextResponse> => {
			try {
				if (await shouldRefresh(req)) {
					console.log("Refreshing token");
					const tokenPair = await fetchTokenPair(req);
					const res = NextResponse.next();
					onSuccess(res, tokenPair);
					return res;
				}
			} catch (error) {
				console.error("Error in token refresh:", error);
				if (onError) {
					console.error("Gotcha lol");
					const res = NextResponse.next();
					onError(req, res, error);
					return res;
				}
			}

			return middleware(req);
		};
	};
}

export const withRefreshToken = getMiddleware({
	shouldRefresh: async (req) => {
		console.log("Checking if token should be refreshed");
		const JWT_SECRET = process.env.ACCESS_JWT_KEY ?? "";
		const accessToken = req.cookies.get("accessToken")?.value;
		if (!accessToken) return true;
		try {
			const payload = await decodeJwt(accessToken, JWT_SECRET);
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
		const JWT_SECRET = process.env.REFRESH_JWT_KEY ?? "";
		if (!refreshToken) {
			throw new Error("Refresh token not valid");
		}

		if (!decodeJwt(refreshToken as string, JWT_SECRET)) {
			throw new Error("Refresh token not valid");
		}

		const response = await fetch(`${UNWIND_API_BASE_URL}/auth/refresh`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${refreshToken}`,
			},
		});
		if (!response.ok) {
			throw new Error(`Failed to refresh token: ${response.statusText}`);
		}
		return await response.json();
	},
	onSuccess: (res, tokenPair) => {
		console.log("Setting new access token");
		res.cookies.set({
			name: "accessToken",
			value: tokenPair.accessToken,
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			maxAge: 14 * 60,
			path: "/",
		});
	},

	onError: (req, _, error) => {
		console.error("Error in refresh token process:", error);
		// res.cookies.set({
		//   name: "accessToken",
		//   value: "",
		//   maxAge: 0,
		//   path: "/",
		// });
		// res.cookies.set({
		//   name: "refreshToken",
		//   value: "",
		//   maxAge: 0,
		//   path: "/",
		// });
		if (error) {
			return NextResponse.redirect(new URL("/auth", req.url));
		}
	},
});
