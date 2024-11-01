import SiteHeader from "@/_components/shared/site-header/site-header";

export default function AnimeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SiteHeader />
			{children}
		</>
	);
}
