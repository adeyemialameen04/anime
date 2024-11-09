import { TabsContent } from "@/components/ui/tabs";
import Settings from "./_components/settings";

export default function SettingsPage() {
	return (
		<TabsContent value="settings" className="">
			<Settings />
		</TabsContent>
	);
}
