import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.noitatnemucod.net",
				port: "",
				pathname: "/thumbnail/**",
			},
			{
				protocol: "https",
				hostname: "s4.anilist.co",
				port: "",
				pathname: "/file/**",
			},
		],
	},
};

export default nextConfig;
