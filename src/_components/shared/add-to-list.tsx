import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AddToList({ animeId }: { animeId: string }) {
	return (
		<form>
			<Button variant={"outline"}>
				<PlusCircle className="h-4 w-4" />
				Add to List
			</Button>
		</form>
	);
}
