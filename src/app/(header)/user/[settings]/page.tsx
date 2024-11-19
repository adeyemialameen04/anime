import { TabsContent } from "@radix-ui/react-tabs";
import Settings from "./_components/settings";
import Profile from "./_components/profile";
import { assertUserAuthenticated } from "@/lib/auth/auth";
import makeFetch from "@/lib/helpers/fetch";
import type { ApiResponse, TimeStamp } from "@/types/unwind";
import type { Profile as ProfileType, WatchList } from "@/types/unwind/user";
import WatchListGrid from "./_components/watch-list";

const getProfile = async () => {
	const user = await assertUserAuthenticated();

	try {
		return await makeFetch<ApiResponse<ProfileType & TimeStamp>>(
			"unwind",
			"/user/profile",
			user.accessToken,
			{
				next: {
					tags: [`profile-${user.user.profileId}`],
				},
			},
		)();
	} catch (err) {
		console.error(err);
	}
};

const getWatchList = async () => {
	const user = await assertUserAuthenticated();

	try {
		return await makeFetch<ApiResponse<WatchList[]>>(
			"unwind",
			"/user/watch-list",
			user.accessToken,
			{
				next: {
					tags: [`watch-list-${user.user.profileId}`],
				},
			},
		)();
	} catch (err) {
		console.error(err);
	}
};

export default async function UserPage({
	params,
}: { params: Promise<{ settings: string }> }) {
	const currentPage = (await params).settings;
	let profileRes: ApiResponse<ProfileType & TimeStamp> | undefined;
	let watchListResponse: ApiResponse<WatchList[]> | undefined;
	if (currentPage === "profile") profileRes = await getProfile();
	if (currentPage === "watchlist") watchListResponse = await getWatchList();

	return (
		<>
			<TabsContent value="settings" className="">
				<Settings />
			</TabsContent>
			{currentPage === "profile" && (
				<TabsContent value="profile" className="">
					<Profile profileData={profileRes?.data as ProfileType & TimeStamp} />
				</TabsContent>
			)}
			{currentPage === "watchlist" && (
				<TabsContent value="watchlist" className="">
					<WatchListGrid watchlist={watchListResponse?.data as WatchList[]} />
				</TabsContent>
			)}
		</>
	);
}
