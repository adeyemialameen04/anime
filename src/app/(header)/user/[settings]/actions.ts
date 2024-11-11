import { authenticatedAction } from "@/lib/safe-action";
import makeFetch from "@/lib/helpers/fetch";
import type { SuccessResponse, TimeStamp } from "@/types/unwind";
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
				console.log(profilePic === coverPic);

				return await makeFetch<SuccessResponse<Profile & TimeStamp>>(
					"unwind",
					"/user/profile",
					user.accessToken,
					{
						method: "PATCH",
						body: {
							name: name,
							username: username,
							profilePic,
							coverPic,
						},
					},
				)();
			} catch (err) {
				console.error(err);
			}
		},
	);
