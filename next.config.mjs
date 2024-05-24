/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.timeweb.cloud",
        port: "",
        pathname: `/8911d74e-b8db364b-f1fe-4e96-a59a-a57ee544dcdd/**`,
      },
    ],
  },
};

export default nextConfig;
