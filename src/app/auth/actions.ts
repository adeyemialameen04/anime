"use server";
import { unauthenticatedAction } from "@/lib/safe-action";
import makeFetch from "@/lib/helpers/fetch";
import type { SuccessResponse } from "@/types/unwind";
import { authSchema } from "./schema";
import type { AuthSuccess } from "@/types/unwind/auth";

export const authAction = unauthenticatedAction
	.createServerAction()
	.input(authSchema)
	.handler(async ({ input }) => {
		try {
			const { signUp, ...credentials } = input;

			return await makeFetch<SuccessResponse<AuthSuccess>>(
				"unwind",
				`/auth/${signUp ? "signup" : "login"}`,
				null,
				{
					method: "POST",
					body: credentials,
				},
			)();
		} catch (err) {
			console.error(err);
		}
	});
