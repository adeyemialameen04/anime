import {
	AuthenticationError,
	PublicError,
	ConflictError,
	InvariantError,
	AuthorizationError,
	NotFoundError,
	InternalServerError,
} from "@/exceptions/errors";
import { ANIWATCH_API_BASE_URL } from "../constants";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface NextJsOptions {
	revalidate?: number | false;
	tags?: string[];
}

interface FetchOptions extends Omit<RequestInit, "method" | "body"> {
	method?: HttpMethod;
	body?: Record<string, unknown>;
	next?: NextJsOptions;
}

type CustomErrorConstructor = new (message: string) => Error;

const errorMap: Record<number, CustomErrorConstructor> = {
	400: InvariantError,
	401: AuthenticationError,
	403: AuthorizationError,
	404: NotFoundError,
	409: ConflictError,
	500: InternalServerError,
};

export default function makeFetch<T>(
	service: "aniwatch" | "users",
	path: string,
	accessToken: string | null,
	options: FetchOptions = {},
): () => Promise<T> {
	return async () => {
		const { method = "GET", body, next, ...restOptions } = options;

		const shouldAddContentType =
			["POST", "PUT", "PATCH"].includes(method) && body;

		const headers = new Headers(restOptions.headers);

		if (accessToken) {
			headers.set("Authorization", `Bearer ${accessToken}`);
		}

		if (shouldAddContentType) {
			headers.set("Content-Type", "application/json");
		}

		const fetchOptions: RequestInit & { next?: NextJsOptions } = {
			...restOptions,
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
		};

		if (next) {
			fetchOptions.next = next;
		}

		const res = await fetch(
			`${service === "aniwatch" ? ANIWATCH_API_BASE_URL : ANIWATCH_API_BASE_URL}${path}`,
			fetchOptions,
		);

		if (!res.ok) {
			let errorMessage: string;
			try {
				const errorData = await res.json();
				errorMessage = errorData.detail || "An error occurred";
			} catch {
				errorMessage = res.statusText || "Request failed";
			}

			const ErrorClass = errorMap[res.status] || PublicError;
			throw new ErrorClass(errorMessage);
		}

		const contentType = res.headers.get("content-type");
		if (contentType?.includes("application/json")) {
			return (await res.json()) as T;
		}
		return (await res.text()) as unknown as T;
	};
}
