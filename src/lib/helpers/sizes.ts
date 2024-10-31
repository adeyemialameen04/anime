export default function changeImageSize(url: string, sm?: boolean): string {
	const newUrl = url.replace(
		`https://cdn.noitatnemucod.net/thumbnail/${sm ? "100x200" : "300x400"}`,
		"https://cdn.noitatnemucod.net/thumbnail/1866x1080",
	);
	return newUrl;
}
