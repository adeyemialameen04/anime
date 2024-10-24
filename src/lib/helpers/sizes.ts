export default function changeImageSize(url: string): string {
	const newUrl = url.replace(
		"https://cdn.noitatnemucod.net/thumbnail/300x400",
		"https://cdn.noitatnemucod.net/thumbnail/720x1080",
	);
	return newUrl;
}
