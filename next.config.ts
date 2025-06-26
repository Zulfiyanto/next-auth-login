import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@prisma/client'], // Updated field
};

export default nextConfig;
