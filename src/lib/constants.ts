export const DEV = true;
export const ANIWATCH_API_BASE_URL = `${process.env.NEXT_PUBLIC_ANIWATCH_API_URL}/api/v1`;
export const UNWIND_API_BASE_URL = DEV
	? `${process.env.NEXT_PUBLIC_UNWIND_API_URL}/api/v1`
	: `${process.env.NEXT_PUBLIC_UNWIND_API_URL}/api/v1`;
export const HTTP_STATUS = {
	CONFLICT: "Conflict",
	UNAUTHORIZED: "Unauthorized",
	CREATED: "Created",
	OK: "OK",
	NOT_FOUND: "Not Found",
};
export const ACCESS_JWT_KEY = process.env.ACCESS_JWT_KEY ?? "";
export const REFRESH_JWT_KEY = process.env.REFRESH_JWT_KEY ?? "";
