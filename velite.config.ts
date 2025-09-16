
import { defineConfig, defineCollection, s } from 'velite';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeHighlight from 'rehype-highlight';

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(999),
      slug: s.string(),
      createdAt: s.string().transform(str => new Date(str)), // Transform string to Date
      thumbnail: s.string(),
      category: s.array(s.string()),
      content: s.mdx(),
      raw: s.raw(),
      toc: s.toc(),
      path: s.path(), // Add path to schema
    })
    .transform(data => ({
      ...data,
      slug: data.slug || data.path.replace(/posts\/?/, ""), // Use data.path
    })),
});

const portfolios = defineCollection({
  name: 'Portfolio',
  pattern: 'portfolio/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(999),
      slug: s.string(),
      createdAt: s.string().transform(str => new Date(str)), // Transform string to Date
      thumbnail: s.string(),
      url: s.object({
        blog: s.string().optional(),
        github: s.string().optional(),
        deploy: s.string().optional(),
      }),
      tags: s.array(s.string()),
      content: s.mdx(),
      raw: s.raw(),
      toc: s.toc(),
      path: s.path(), // Add path to schema
    })
    .transform(data => ({
      ...data,
      slug: data.slug || data.path.replace(/portfolio\/?/, ""), // Use data.path
    })),
});

export default defineConfig({
  root: 'contents',
  collections: { posts, portfolios },
  mdx: {
    rehypePlugins: [
      [rehypePrettyCode as any, { theme: 'github-dark' }],
      [rehypeHighlight as any],
    ],
  },
});
