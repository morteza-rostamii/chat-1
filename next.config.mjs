/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
  //loremflickr.com
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'loremflickr.com',
      port: '',
      pathname: '**'
    }]
  },

};

export default nextConfig;
