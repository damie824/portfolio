
cd public

rm -rf sitemap
mkdir sitemap

cd ..

echo "Creating common sitemap.."
node ./sitemap-common.js
echo "Successfully created common sitemap."

echo "Creating dynamic sitemap.."
node ./sitemap-posts.js
echo "Successfully created dynamic sitemap."

echo "compressing sitemaps.."
node ./sitemap-compress.js
node ./sitemap.js
echo "Successfully compressed sitemaps."

curl http://google.com/ping?sitemap=http://gyuyeon.dev/sitemap.xml
echo "Sent ping to google.com"