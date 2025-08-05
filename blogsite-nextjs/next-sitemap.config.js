/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blog-site-silk-nine.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*'], // if any
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/contact'),
      await config.transform(config, '/privacy'),
      await config.transform(config, '/about'),
    ];
  },
};
