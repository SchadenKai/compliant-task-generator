import type { NextConfig } from "next";
import "dotenv";

const nextConfig: NextConfig = {
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL,
  },
};

export default nextConfig;
