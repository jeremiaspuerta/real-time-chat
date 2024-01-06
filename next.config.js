/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        SOCKET_URL: process.env.SOCKET_URL,
        SOCKET_PORT: process.env.SOCKET_PORT
    }
};

module.exports = nextConfig;
