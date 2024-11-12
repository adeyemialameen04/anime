"use client";
import {
	addToListAction,
	editListAction,
	revalidateTagServer,
} from "@/app/actions";
import {
	Check,
	Edit,
	type LucideIcon,
	Play,
	PlusCircle,
	Siren,
	X,
} from "lucide-react";
import { useServerAction } from "zsa-react";
import SubmitButton from "./submit-btn";
import { HTTP_STATUS } from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { WatchList } from "@/types/unwind/user";
import type { ApiResponse } from "@/types/unwind";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { MediaTypeEnum, StatusEnum } from "@/app/schema";

export type WatchistResponse = ApiResponse<WatchList>;
export type ListInsert = {
	mediaId: string;
	poster: string;
	type: MediaTypeEnum;
	title: string;
	duration: number;
	episodes: number;
};

export default function AddToList({
	mediaDetails,
	watchListItem,
}: { mediaDetails: ListInsert; watchListItem: WatchistResponse }) {
	const router = useRouter();
	const editActions: { title: string; value: StatusEnum; icon?: LucideIcon }[] =
		[
			{
				title: "Watching",
				value: "watching",
				icon: Play,
			},
			{
				title: "Completed",
				value: "completed",
				icon: Check,
			},
			{
				title: "On Hold",
				value: "on-hold",
				icon: Siren,
			},
			{
				title: "Plan to watch",
				value: "planning",
			},
		];
	const { execute: addToListExecute, isPending: addingIspending } =
		useServerAction(addToListAction, {
			onSuccess: async ({ data }) => {
				if (data.status === HTTP_STATUS.CREATED) {
					toast.success("Added to watch List");
				} else if (data.status === HTTP_STATUS.CONFLICT) {
					toast.success("Already in watch list");
				}
				await revalidateTagServer("watchlist");
				console.log(data);
			},
			onError: ({ err }) => {
				if (err.message.includes("User not authenticated")) {
					router.push("/auth/sign-in");
					toast.info("Sign In to add to List", {
						richColors: true,
						position: "top-right",
					});
				}
			},
		});

	const { execute: editListExecute, isPending: editingListPending } =
		useServerAction(editListAction, {
			onSuccess: async ({ data }) => {
				if (data.status === HTTP_STATUS.NOT_FOUND) {
					toast.success("This item isn't your list");
				} else if (data.status === HTTP_STATUS.OK) {
					toast.success("Updated list successfully");
				}
				await revalidateTagServer("watchlist");
				console.log(data);
			},
			onError: ({ err }) => {
				if (err.message.includes("User not authenticated")) {
					router.push("/auth/sign-in");
					toast.info("Sign In to add to List", {
						richColors: true,
						position: "top-right",
					});
				}
			},
		});

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				await addToListExecute({
					type: "anime",
					title: mediaDetails.title,
					status: "watching",
					poster: mediaDetails.poster,
					mediaId: mediaDetails.mediaId,
				});
			}}
		>
			{watchListItem.status === HTTP_STATUS.UNAUTHORIZED ? (
				<SubmitButton
					variant={"outline"}
					isLoading={addingIspending}
					type="button"
					onClick={() => router.push("/auth/sign-in")}
				>
					<PlusCircle className="h-4 w-4" />
					Add to List
				</SubmitButton>
				// biome-ignore lint/nursery/noNestedTernary: <explanation>
			) : watchListItem?.status === HTTP_STATUS.NOT_FOUND ? (
				<SubmitButton
					variant={"outline"}
					isLoading={addingIspending}
					type="submit"
				>
					{!addingIspending && <PlusCircle className="h-4 w-4" />}
					Add to List
				</SubmitButton>
			) : (
				<DropdownMenu>
					<DropdownMenuTrigger asChild disabled={editingListPending}>
						<Button variant={"outline"}>
							<Edit className="h-4 w-4" />
							Edit Watch List
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuGroup>
							{editActions.map((action) => (
								<DropdownMenuItem
									key={action.value}
									onClick={async () => {
										await editListExecute({
											status: action.value,
											id: watchListItem.data.id,
											action: "patch",
										});
									}}
								>
									{action.value !== "planning" ? <action.icon /> : "🤔"}
									<span>{action.title}</span>
								</DropdownMenuItem>
							))}
							<DropdownMenuItem
								onClick={async () => {
									await editListExecute({
										action: "delete",
										status: "dropped",
										id: watchListItem.data.id,
									});
								}}
							>
								<X /> <span className="text-destructive">Remove</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</form>
	);
}
