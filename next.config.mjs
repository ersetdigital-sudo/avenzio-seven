/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The legacy static site lives in /legacy and is not part of the build.
  // Everything that needs to be served statically lives in /public.
  trailingSlash: false,
};

export default nextConfig;