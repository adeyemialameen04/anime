"use client";
import { Button } from "@/components/ui/button";
import type { ServersData } from "@/types/anime/anilist";
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import React from "react";

export default function Servers({ servers }: { servers: ServersData }) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="w-[350px] space-y-2"
		>
			<div className="flex items-center justify-between space-x-4 px-4">
				<h4 className="text-sm font-semibold">Available Servers</h4>
				<CollapsibleTrigger asChild>
					<Button variant="ghost" size="sm" className="w-9 p-0">
						<ChevronsUpDown className="h-4 w-4" />
						<span className="sr-only">Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<div className="rounded-md border px-4 py-3 font-mono text-sm">
				{servers.sub[0].serverName}
			</div>
			<CollapsibleContent className="space-y-2">
				<div className="rounded-md border px-4 py-3 font-mono text-sm">
					{servers.sub.map((server) => (
						<React.Fragment key={server.serverId}>
							{server.serverName}
						</React.Fragment>
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}
