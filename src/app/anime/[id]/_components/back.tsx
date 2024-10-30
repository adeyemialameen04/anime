"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Back() {
	const router = useRouter();

	return (
		<div className="container md:container-none">
			<Button
				variant={"outline"}
				onClick={() => router.back()}
				className="rounded-none mb-4"
				size={"lg"}
			>
				Back
			</Button>
		</div>
	);
}
