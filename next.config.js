module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://spark-api-open.xf-yun.com/:path*',
        },
      ]
    },
  }