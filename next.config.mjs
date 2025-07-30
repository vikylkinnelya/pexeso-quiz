/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  output: 'standalone',
};

export default withPWA(nextConfig);
