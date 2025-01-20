
cd public

rm -rf sitemap
mkdir sitemap

cd ..

echo "Creating common sitemap.."
node ./sitemap-common.js
echo "Successfully created common sitemap."

echo "Creating dynamic sitemap.."
node ./sitemap-blog.js
echo "Successfully created dynamic sitemap."

echo "compressing sitemaps.."
node ./sitemap-compress.js
echo "Successfully compressed sitemaps."

echo "Creating sitemap index.."
node ./sitemap.js
echo "Successfully created sitemap index."