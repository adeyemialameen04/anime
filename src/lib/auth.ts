"use server";
import type { AuthSuccess } from "@/types/unwind/auth";
import { cookies } from "next/headers";

export const assertUserAuthenticated = async (): Promise<AuthSuccess> => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken");
	const refreshToken = cookieStore.get("refreshToken");
	const userDataCookie = cookieStore.get("user");

	if (!accessToken || !userDataCookie) {
		throw new Error("User not authenticated");
	}

	try {
		const user = JSON.parse(userDataCookie.value);

		return {
			accessToken: accessToken?.value as string,
			refreshToken: refreshToken?.value as string,
			user,
		};
	} catch (error) {
		console.error("Error parsing user data:", error);
		throw new Error("Invalid authentication");
	}
};

export async function saveUserTokens(data: AuthSuccess) {
	const cookieStore = await cookies();
	cookieStore.set("accessToken", data.accessToken as string, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		// maxAge: tokens.accessTokenExpiry - Math.floor(Date.now() / 1000),
		path: "/",
	});
	cookieStore.set("refreshToken", data.refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		// maxAge: tokens.refreshTokenExpiry - Math.floor(Date.now() / 1000),
		path: "/",
	});

	const userData = JSON.stringify(data.user);
	cookieStore.set("user", userData, {
		httpOnly: false,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		// maxAge: tokens.refreshTokenExpiry - Math.floor(Date.now() / 1000),
		path: "/",
	});
}
