const zlib = require("zlib");
const fs = require("fs");

const dirs = ["./public/sitemap"];
dirs.forEach((dir) => {
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith(".xml") && file !== "sitemap.xml") {
      console.log("Found new sitemap : " + file);
      // gzip
      const fileContents = fs.createReadStream(dir + "/" + file);
      const writeStream = fs.createWriteStream(dir + "/" + file + ".gz");
      const zip = zlib.createGzip();

      fileContents
        .pipe(zip)
        .on("error", (err) => console.error(err))
        .pipe(writeStream)
        .on("error", (err) => console.error(err));
    }
  });
});
