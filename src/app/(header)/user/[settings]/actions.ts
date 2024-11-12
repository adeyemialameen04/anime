import { authenticatedAction } from "@/lib/safe-action";
import makeFetch from "@/lib/helpers/fetch";
import type { ApiResponse, TimeStamp } from "@/types/unwind";
import type { Profile } from "@/types/unwind/user";
import { editProfileSchema } from "./schema";

export const editProfileAction = authenticatedAction
	.createServerAction()
	.input(editProfileSchema)
	.handler(
		async ({
			input: { name, username, profilePic, coverPic },
			ctx: { user },
		}) => {
			try {
				return await makeFetch<ApiResponse<Profile & TimeStamp>>(
					"unwind",
					"/user/profile",
					user.accessToken,
					{
						method: "PATCH",
						body: {
							name: name,
							username: username,
							...(!coverPic?.startsWith("https://res.") && { coverPic }),
							...(!profilePic?.startsWith("https://res.") && { profilePic }),
						},
					},
				)();
			} catch (err) {
				console.error(err);
			}
		},
	);
