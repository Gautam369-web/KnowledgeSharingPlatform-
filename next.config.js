/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com',
            'ui-avatars.com',
            'images.unsplash.com'
        ],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
