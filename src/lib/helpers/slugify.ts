export function slugify(
	inputText: string,
	allowUnicode: boolean = false,
): string {
	let text = inputText; // Assign the input to a new variable to avoid reassigning the parameter

	if (allowUnicode) {
		text = text.normalize("NFKC"); // Normalization Form KC (compatible with composed characters)
	} else {
		text = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, ""); // Decompose and remove diacritics
	}

	text = text.toLowerCase();

	text = text.replace(/[^a-z0-9\s-]/g, "");

	text = text.replace(/[-\s]+/g, "-").trim();

	return text.replace(/^-+|-+$/g, "");
}
