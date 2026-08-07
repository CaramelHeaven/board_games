import type { NextConfig } from "next";

// Сайт живёт статикой на GitHub Pages в подпапке /board_games.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/board_games",
  trailingSlash: true,
};

export default nextConfig;
