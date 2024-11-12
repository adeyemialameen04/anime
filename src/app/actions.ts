"use server";
import makeFetch from "@/lib/helpers/fetch";
import { authenticatedAction } from "@/lib/safe-action";
import type { ApiResponse } from "@/types/unwind";
import type { WatchList } from "@/types/unwind/user";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { MediaTypeEnum, StatusEnum } from "./schema";

export const revalidateTagServer = async (tag: string) => {
	revalidateTag(tag);
};

export const addToListAction = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			mediaId: z.string(),
			poster: z.string(),
			status: StatusEnum,
			title: z.string(),
			type: MediaTypeEnum,
		}),
	)
	.handler(async ({ input, ctx: { user } }) => {
		console.log("not at all");
		return await makeFetch<ApiResponse<WatchList>>(
			"unwind",
			"/user/watch-list",
			user.accessToken,
			{
				method: "POST",
				body: {
					...input,
				},
			},
		)();
	});

export const editListAction = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			status: StatusEnum,
			id: z.string(),
			action: z.enum(["patch", "delete"]),
		}),
	)
	.handler(async ({ input, ctx: { user } }) => {
		return await makeFetch<ApiResponse<WatchList>>(
			"unwind",
			`/user/watch-list/${input.id}`,
			user.accessToken,
			{
				method: input.action === "patch" ? "PATCH" : "DELETE",
				...(input.action === "patch" && {
					body: {
						status: input.status,
					},
				}),
			},
		)();
	});
