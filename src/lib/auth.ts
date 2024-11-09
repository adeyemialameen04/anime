"use server";
import { cookies } from "next/headers";

export const assertUserAuthenticated = async () => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken");
	const userDataCookie = cookieStore.get("user");

	if (!accessToken || !userDataCookie) {
		throw new Error("User not authenticated");
	}

	try {
		const user = JSON.parse(userDataCookie.value);

		return {
			accessToken,
			userId: user.id,
			user,
		};
	} catch (error) {
		console.error("Error parsing user data:", error);
		throw new Error("Invalid authentication");
	}
};

export async function saveUserTokens(data: {
	accessToken: string;
	refreshToken: string;
	id: string;
}) {
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

	cookieStore.set("uuid", data.id, {
		httpOnly: false,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		// maxAge: tokens.refreshTokenExpiry - Math.floor(Date.now() / 1000),
		path: "/",
	});
}
