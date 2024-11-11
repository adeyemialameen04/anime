import { TabsContent } from "@radix-ui/react-tabs";
import Settings from "./_components/_settings/settings";
import Profile from "./_components/_profile/profile";
import { assertUserAuthenticated } from "@/lib/auth";
import makeFetch from "@/lib/helpers/fetch";
import type { SuccessResponse, TimeStamp } from "@/types/unwind";
import type { Profile as ProfileType } from "@/types/unwind/user";

const getProfile = async () => {
	const user = await assertUserAuthenticated();

	try {
		return await makeFetch<SuccessResponse<ProfileType & TimeStamp>>(
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

export default async function UserPage() {
	const profileRes = await getProfile();

	return (
		<>
			<TabsContent value="settings" className="">
				<Settings />
			</TabsContent>
			<TabsContent value="profile" className="">
				<Profile profileData={profileRes?.data as ProfileType & TimeStamp} />
			</TabsContent>
		</>
	);
}
