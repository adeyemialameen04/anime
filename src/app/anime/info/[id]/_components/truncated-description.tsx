"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import parse from "html-react-parser";
import { useState } from "react";

const TruncatedDescription = ({
	text,
	CHAR_LIMIT,
}: { text: string; CHAR_LIMIT: number }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const shouldTruncate = text.length > CHAR_LIMIT;
	const displayText = isExpanded ? text : text.slice(0, CHAR_LIMIT) + "...";

	if (!shouldTruncate) return <>{parse(text)}</>;

	return (
		<div className="space-y-2">
			<div className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">
				{parse(displayText)}
			</div>
			<Button
				variant="ghost"
				size="sm"
				onClick={() => setIsExpanded(!isExpanded)}
				className="flex items-center gap-1 h-6 px-2 text-xs"
			>
				{isExpanded ? (
					<>
						Show Less <ChevronUp className="h-3 w-3" />
					</>
				) : (
					<>
						Show More <ChevronDown className="h-3 w-3" />
					</>
				)}
			</Button>
		</div>
	);
};
export default TruncatedDescription;
