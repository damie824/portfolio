/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://gyuyeon.dev/",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/secret-page", "/do-not-include"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://gyuyeon.dev/my-custom-sitemap-1.xml",
      "https://gyuyeon.dev/my-custom-sitemap-2.xml",
    ],
  },
};
