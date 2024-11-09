"use server";
import { unauthenticatedAction } from "@/lib/safe-action";
import makeFetch from "@/lib/helpers/fetch";
import type { SuccessResponse } from "@/types/unwind";
import { z } from "zod";
import { authSchema } from "./schema";
import { AuthSuccess } from "@/types/unwind/auth";

export const authAction = unauthenticatedAction
	.createServerAction()
	.input(authSchema.extend({ signUp: z.boolean() }))
	.handler(async ({ input: { email, password, signUp } }) => {
		try {
			return await makeFetch<SuccessResponse<AuthSuccess>>(
				"unwind",
				`/auth/${signUp ? "signup" : "login"}`,
				null,
				{
					method: "POST",
					body: {
						email,
						password,
					},
				},
			)();
		} catch (err) {
			console.error(err);
		}
	});
