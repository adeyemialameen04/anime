import { assertUserAuthenticated } from "@/lib/auth";
import { HTTP_STATUS } from "@/lib/constants";
import makeFetch from "@/lib/helpers/fetch";
import type { ApiResponse } from "@/types/unwind";
import type { WatchList } from "@/types/unwind/user";

export const getInWatchList = async (id: string) => {
	try {
		const user = await assertUserAuthenticated();
		return await makeFetch<ApiResponse<WatchList>>(
			"unwind",
			`/user/watch-list/${id}`,
			user.accessToken,
			{
				next: {
					tags: ["watchlist"],
				},
			},
		)();
	} catch (err) {
		if (err instanceof Error) {
			if (err.message.includes("User not authenticated"))
				return {
					status: HTTP_STATUS.UNAUTHORIZED,
					message: "User not authenticated",
				};
		}
	}
};
