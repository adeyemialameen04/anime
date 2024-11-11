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
				hostname: "i.animepahe.ru",
				port: "",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/dzsomaq4z/image/**",
			},
			{
				protocol: "https",
				hostname: "media.kitsu.app",
				port: "",
				pathname: "/episodes/**",
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
