import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { dmSans, spaceGrotesk } from "@/lib/fonts";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${spaceGrotesk.variable} ${geistMono.variable} ${dmSans.variable} ${dmSans.className} antialiased pb-20`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Toaster />
					{/* <SiteHeader /> */}
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
