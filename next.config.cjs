module.exports = {
  reactStrictMode: false,
  swcMinify: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/discover', // Redirect to your discover page
        permanent: true, // Set to false if this is not a permanent redirect
      },
    ];
  },
};
