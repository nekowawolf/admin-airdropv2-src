import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'pbs.twimg.com',
      'www.nekowawolf.xyz',
      'nekowawolf.xyz', 
      's3.coinmarketcap.com',
      'nekowawolf.github.io',
      'cdn.discordapp.com',
      'avatars.githubusercontent.com',
      'admin.nekowawolf.xyz',
      'cmty.nekowawolf.xyz',
      'cdn.motor1.com',
      'static.wixstatic.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'loremflickr.com',
      'imgur.com',
      'i.imgur.com',
      'source.unsplash.com',
    ],
  },
};

export default nextConfig;