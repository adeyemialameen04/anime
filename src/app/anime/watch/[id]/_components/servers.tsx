"use client";
import { useState } from "react";
import type { ServersData } from "@/types/anime/anilist";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function Servers({
	servers,
	onServerSelect,
}: {
	servers: ServersData;
	onServerSelect: (serverId: string, type: "sub" | "dub") => void;
}) {
	const [selectedSubServer, setSelectedSubServer] = useState<string | null>(
		null,
	);
	const [selectedDubServer, setSelectedDubServer] = useState<string | null>(
		null,
	);

	const handleServerClick = (serverId: string, type: "sub" | "dub") => {
		if (type === "sub") {
			setSelectedSubServer(serverId);
			setSelectedDubServer(null);
		} else {
			setSelectedDubServer(serverId);
			setSelectedSubServer(null);
		}
		onServerSelect(serverId, type);
	};

	return (
		<Card className="w-full max-w-2xl mt-4">
			<CardContent className="p-6">
				<h2 className="text-2xl font-bold mb-4">Available Servers</h2>
				<Tabs defaultValue="sub">
					<TabsList className="grid w-full grid-cols-2 mb-4">
						<TabsTrigger value="sub">Sub</TabsTrigger>
						<TabsTrigger value="dub">Dub</TabsTrigger>
					</TabsList>
					<TabsContent value="sub">
						<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
							{servers.sub.map((server) => (
								<Badge
									key={server.serverId}
									variant={
										selectedSubServer === server.serverId
											? "default"
											: "outline"
									}
									className={`justify-center py-2 cursor-pointer ${
										selectedSubServer === server.serverId
											? "bg-primary text-primary-foreground"
											: ""
									}`}
									onClick={() => handleServerClick(server.serverId, "sub")}
								>
									{server.serverName}
								</Badge>
							))}
						</div>
					</TabsContent>
					<TabsContent value="dub">
						<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
							{servers.dub.map((server) => (
								<Badge
									key={server.serverId}
									variant={
										selectedDubServer === server.serverId
											? "default"
											: "outline"
									}
									className={`justify-center py-2 cursor-pointer ${
										selectedDubServer === server.serverId
											? "bg-primary text-primary-foreground"
											: ""
									}`}
									onClick={() => handleServerClick(server.serverId, "dub")}
								>
									{server.serverName}
								</Badge>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
