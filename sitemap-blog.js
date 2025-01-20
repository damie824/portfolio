(async () => {
  const fs = await import("fs");
  const prettier = await import("prettier");
  const { globby } = await import("globby");

  const getDate = new Date().toISOString();
  const GYUYEON_DEV_DOMAIN = "https://gyuyeon.dev/blog";

  const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

  const pages = await globby([
    // include
    "./contents/posts/**/*.mdx",
  ]);

  const pagesSitemap = pages
    .map((page) => {
      const path = page.replace("./contents/posts/", "").replace(".mdx", "");
      const routePath = path === "index" ? "" : path;
      return `
          <url>
            <loc>${GYUYEON_DEV_DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
            <priority>0.50</priority>
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
      ${pagesSitemap}
    </urlset>
  `;

  const formattedSitemap = await formatted(generatedSitemap);

  fs.writeFileSync(
    "./public/sitemap/sitemap-blog.xml",
    formattedSitemap,
    "utf8"
  );
})();
