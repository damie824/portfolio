import { allPosts } from "@/../.contentlayer/generated";
import Categories from "@/components/sections/blog/categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 - 규연.데브",
  description: "개발자로서의 경험을 꾹꾹 눌러담은 글들을 모아봤어요.",
  openGraph: {
    title: "블로그 - 규연.데브",
    description: "개발자로서의 경험을 꾹꾹 눌러담은 글들을 모아봤어요.",
    type: "website",
    locale: "ko_KR",
    url: "https://gyuyeon.dev/blog",
  },
  twitter: {
    card: "summary",
    title: "블로그 - 규연.데브",
    description: "개발자로서의 경험을 꾹꾹 눌러담은 글들을 모아봤어요.",
    creator: "@damie824",
  },
};

export default function BlogPage() {
  return (
    <main className="max-w-[1200px] mx-auto">
      <Categories posts={allPosts} />
    </main>
  );
}
