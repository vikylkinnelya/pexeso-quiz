import pkg from 'next-pwa';
const { withPWA } = pkg;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
};

export default withPWA(nextConfig);
