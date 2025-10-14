(async () => {
  const fs = await import("fs");
  const prettier = await import("prettier");
  const { globby } = await import("globby");

  const getDate = new Date().toISOString();
  const GYUYEON_DEV_DOMAIN = "https://gyuyeon.dev";

  const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

  const pages = await globby([
    // include
    "./src/app/**/page.tsx",
    "./src/app/page.tsx",
    //exclude
    "!./src/app/**/[...slug]/*.tsx",
  ]);

  const pagesSitemap = pages
    .map((page) => {
      const path = page
        .replace("./src/app/", "")
        .replace("/page.tsx", "")
        .replace(/\/index/g, "");
      const routePath = path === "index" ? "" : path;
      if (routePath.includes("(site)") || /\[.*\]/.test(routePath)) {
        return "";
      }
      return `
          <url>
            <loc>${GYUYEON_DEV_DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
            <priority>0.80</priority>
          </url>
        `;
    })
    .join("");

  const generatedSitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        <url>
            <loc>https://gyuyeon.dev/</loc>
            <lastmod>2025-01-20T13:37:21.500Z</lastmod>
            <priority>1.00</priority>
        </url>
      ${pagesSitemap}
    </urlset>
  `;

  const formattedSitemap = await formatted(generatedSitemap);

  fs.writeFileSync(
    "./public/sitemap/sitemap-common.xml",
    formattedSitemap,
    "utf8"
  );
})();
