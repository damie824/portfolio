import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: "posts/**/*.mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    createdAt: { type: "date", required: true },
    thumbnail: { type: "string", required: true },
    category: { type: "list", of: { type: "string" }, required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc: any) => doc._raw.flattenedPath.replace(/posts\/?/, ""),
    },
  },
}));

export const Portfolio = defineDocumentType(() => ({
  name: "Portfolio",
  contentType: "mdx",
  filePathPattern: "portfolio/**/*.mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    createdAt: { type: "date", required: true },
    thumbnail: { type: "string", required: true },
    url: { type: "json", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc: any) => doc._raw.flattenedPath.replace(/portfolio\/?/, ""),
    },
  },
}));

const contentSource = makeSource({
  contentDirPath: "contents",
  documentTypes: [Post, Portfolio],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypePrettyCode as any,
        {
          theme: "github-dark",
        },
      ],
      highlight as any,
    ],
  },
});

export default contentSource;
