const getDate = new Date().toISOString();
const GYUYEON_DEV_DOMAIN = "https://gyuyeon.dev";

(async () => {
  const fs = await import("fs");
  const prettier = await import("prettier");
  const { globby } = await import("globby");
  const pages = await globby(["./public/sitemap/*.gz"]);

  const formatted = async (sitemap) =>
    await prettier.format(sitemap, { parser: "html" });

  const sitemapIndex = `
    ${pages
      .map((page) => {
        const path = page.replace("./public/", "");
        return `
          <sitemap>
            <loc>${`${GYUYEON_DEV_DOMAIN}/${path}`}</loc>
            <lastmod>${getDate}</lastmod>
          </sitemap>`;
      })
      .join("")}
  `;

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapIndex}
    </sitemapindex>
  `;

  const formattedSitemap = await formatted(sitemap);

  fs.writeFileSync("./public/sitemap.xml", formattedSitemap, "utf8");
})();
