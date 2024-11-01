export default function changeImageSize(url: string): string {
	const newUrl = url.replace(
		"https://cdn.noitatnemucod.net/thumbnail/300x400",
		"https://cdn.noitatnemucod.net/thumbnail/1866x1080",
	);
	return newUrl;
}

export function changeImageSizeSm(url: string): string {
	const newUrl = url.replace(
		"https://cdn.noitatnemucod.net/thumbnail/100x200",
		"https://cdn.noitatnemucod.net/thumbnail/1866x1080",
	);
	return newUrl;
}
