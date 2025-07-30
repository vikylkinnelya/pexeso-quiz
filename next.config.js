/** @type {import('next').NextConfig} */
import { withPWA } from 'next-pwa';

const nextConfig = {
  output: 'standalone',
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
};

export default withPWA(nextConfig);
