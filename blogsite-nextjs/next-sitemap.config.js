/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://yourdomain.com", // <-- CHANGE to your deployed domain
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/server-sitemap.xml"], // optional if not using server sitemap
  changefreq: "daily",
  priority: 0.7,
};
