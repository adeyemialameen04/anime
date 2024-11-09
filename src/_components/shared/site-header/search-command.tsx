"use client";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import * as React from "react";
import {
	Calculator,
	Calendar,
	CreditCard,
	Settings,
	Smile,
	User,
} from "lucide-react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { useSearch } from "@/hooks/use-search";

export function SearchDialog() {
	const [open, setOpen] = React.useState(false);
	const [query, setQuery] = React.useState("");
	const { data, isLoading, isError } = useSearch(query);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);
	console.log(data);

	const handleSearch = (value: string) => {
		setQuery(value);
	};

	return (
		<>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					placeholder="Search for anything..."
					onValueChange={handleSearch}
				/>
				<CommandList>
					<VisuallyHidden.Root>
						<DialogTitle>Search command</DialogTitle>
					</VisuallyHidden.Root>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Anime">
						<CommandItem>
							<Calendar />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<Smile />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<Calculator />
							<span>Calculator</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Movies">
						<CommandItem>
							<User />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<CreditCard />
							<span>Billing</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
