/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    
    return [
      {
        source: '/.netlify/functions/hello',
        destination: 'http://localhost:3001/.netlify/functions/hello',
      },
      {
        source: '/.netlify/functions/create_secret',
        destination: 'http://localhost:3001/.netlify/functions/create_secret',
      },
      {
        source: '/.netlify/functions/get_secret',
        destination: 'http://localhost:3001/.netlify/functions/get_secret',
      },
    ]
  },
}