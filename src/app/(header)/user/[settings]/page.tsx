import { TabsContent } from "@radix-ui/react-tabs";
import Settings from "./_components/_settings/settings";
import Profile from "./_components/_profile/profile";

export default async function SettingsPage() {
	return (
		<>
			<TabsContent value="settings" className="">
				<Settings />
			</TabsContent>
			<TabsContent value="profile" className="">
				<Profile />
			</TabsContent>
		</>
	);
}
