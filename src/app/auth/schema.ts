// schema.ts
import { z } from "zod";

const baseAuthSchema = {
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
};

// Schema for sign in
export const signInSchema = z.object(baseAuthSchema);

// Schema for sign up (includes required username)
export const signUpSchema = z.object({
	...baseAuthSchema,
	username: z.string().min(8, "Username must be at least 8 characters"),
});

// Combined schema that changes based on signUp flag
export const authSchema = z.discriminatedUnion("signUp", [
	z.object({ signUp: z.literal(true), ...signUpSchema.shape }),
	z.object({ signUp: z.literal(false), ...signInSchema.shape }),
]);

export type AuthSchema =
	| z.infer<typeof signUpSchema>
	| z.infer<typeof signInSchema>;
