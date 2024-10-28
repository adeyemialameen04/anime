import SiteHeader from "@/_components/shared/site-header/site-header";

export default function HomeLayout({
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
