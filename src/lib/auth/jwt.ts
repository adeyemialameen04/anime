import type { Payload } from "@/types/unwind/auth";
import { jwtVerify, type JWTPayload } from "jose";

export async function decodeJwt(token: string, JWT_SECRET: string) {
	const encoder = new TextEncoder();
	const secretKey = encoder.encode(JWT_SECRET);

	try {
		const { payload } = await jwtVerify(token, secretKey, {
			algorithms: ["HS256"],
		});

		const typedPayload = payload as JWTPayload & Payload;

		if (typedPayload) {
			return typedPayload;
		}
	} catch (err) {
		console.error(err, "catch");
		return false;
	}
}
