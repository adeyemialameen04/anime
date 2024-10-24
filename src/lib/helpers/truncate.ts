interface TruncateOptions {
	maxLength: number;
	ellipsis?: string;
	breakOnWord?: boolean;
}

export default function truncateText(
	text: string,
	options: TruncateOptions,
): string {
	const { maxLength, ellipsis = "...", breakOnWord = true } = options;

	if (text.length <= maxLength) return text;

	const truncatedLength = maxLength - ellipsis.length;

	if (breakOnWord) {
		const lastSpace = text.lastIndexOf(" ", truncatedLength);

		if (lastSpace > -1) {
			return text.slice(0, lastSpace).trim() + ellipsis;
		}
	}

	return text.slice(0, truncatedLength).trim() + ellipsis;
}
