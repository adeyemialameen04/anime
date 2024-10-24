import { DM_Sans } from "next/font/google";
import { Space_Grotesk as SpaceGrotesk } from "next/font/google";

export const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const spaceGrotesk = SpaceGrotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
	weight: ["300", "400", "500", "600", "700"],
});
