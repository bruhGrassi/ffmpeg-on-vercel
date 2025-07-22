import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/app/(loggedIn)/convert": [
      "./public/videos/sample.mp4",
      "./node_modules/ffmpeg-static/ffmpeg",
    ],
  },
};

export default nextConfig;
