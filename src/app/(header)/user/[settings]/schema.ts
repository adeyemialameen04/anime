import { z } from "zod";

export const editProfileSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	username: z.string().min(8, {
		message: "Username must be at least 2 characters.",
	}),
	coverPic: z.string().optional(),
	profilePic: z.string().optional(),
});
export type EditProfile = z.infer<typeof editProfileSchema>;
