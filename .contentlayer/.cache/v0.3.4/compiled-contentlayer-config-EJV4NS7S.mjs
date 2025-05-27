// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";
var Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: "posts/**/*.mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    createdAt: { type: "date", required: true },
    thumbnail: { type: "string", required: true },
    category: { type: "list", of: { type: "string" }, required: true }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/posts\/?/, "")
    }
  }
}));
var Portfolio = defineDocumentType(() => ({
  name: "Portfolio",
  contentType: "mdx",
  filePathPattern: "portfolio/**/*.mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    createdAt: { type: "date", required: true },
    thumbnail: { type: "string", required: true },
    url: { type: "json", required: true },
    tags: { type: "list", of: { type: "string" }, required: true }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/portfolio\/?/, "")
    }
  }
}));
var contentSource = makeSource({
  contentDirPath: "contents",
  documentTypes: [Post, Portfolio],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark"
        }
      ],
      highlight
    ]
  }
});
var contentlayer_config_default = contentSource;
export {
  Portfolio,
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-EJV4NS7S.mjs.map
