"use client";

import { Post } from "@/contentlayer/generated";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Categories({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const categories = Array.from(
    new Set(posts.flatMap((post) => post.category))
  );
  const postsPerPage = 5;

  const onCategoryButtonClick = (category: string | null): void => {
    setCategory(category);
    setCurrentPage(1);
    const url = new URL(window.location.href);
    if (category) {
      url.searchParams.set("category", category);
    } else {
      url.searchParams.delete("category");
    }
    window.history.pushState({}, "", url.toString());
  };

  const filteredPosts = posts.filter(
    (post) => !category || post.category.includes(category)
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  useEffect(() => {
    const initialCategory: string | null =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("category")
        : null;
    if (categories.includes(initialCategory || "undefined")) {
      setCategory(initialCategory);
    }
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center items-center gap-3 mt-12">
        <h2 className="text-3xl font-bold">{category || "All"}</h2>
      </div>
      <div className="flex flex-col gap-3 mt-5 px-5 md:px-10 md:flex-row mb-12">
        <div className="flex md:flex-col flex-row gap-3 overflow-y-auto scrollbar-thin pb-3 md:w-52 md:pb-5">
          <p className="text-sm font-bold hidden md:block">🗂️ Categories</p>
          <CategoryItem
            item="All"
            onClick={() => onCategoryButtonClick(null)}
            isActive={category === null}
          />
          {categories
            .sort()
            .flat()
            .map((item) => (
              <CategoryItem
                key={item}
                item={item}
                onClick={() => onCategoryButtonClick(item)}
                isActive={category?.includes(item) || false}
              />
            ))}
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="bg-yellow-300/10 items-center w-full rounded-md p-3 flex gap-3 border-yellow-500/20 border">
            <p className="text-xl">📰</p>
            <p className="text-xs md:text-sm">
              반가워요! 이곳은 저 이규연의 개인 블로그 페이지에요.
              <br />
              개발, 일상 등 여러 분야의 글들을 올릴 예정이니 재밌게 읽어주세요!
            </p>
          </div>
          {currentPosts
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((post) => (
              <CategoryPosts key={post.slug} post={post} />
            ))}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : "bg-neutral-800/40 hover:bg-border"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryItem({
  item,
  onClick,
  isActive,
}: {
  item: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-3 py-1 rounded-md transition-colors md:break-words md:w-full w-fit whitespace-nowrap ${
        isActive
          ? "bg-primary text-primary-foreground hover:opacity-80"
          : "hover:bg-border bg-neutral-800/40"
      }`}
    >
      {item}
    </button>
  );
}

function CategoryPosts({ post }: { post: Post }) {
  return (
    <Link
      href={"/blog/" + post.slug}
      className="w-full rounded-md p-3 flex gap-2 py-5 flex-col bg-neutral-800/40 hover:scale-[102%] transition-transform"
    >
      <div className="flex gap-3 items-center">
        <h3 className="font-bold" key={post.slug}>
          {post.title}
        </h3>
        <p className="text-white/50 text-xs">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
      <p className="text-sm text-white/50">
        {post.body.raw.replace(/[#*`]/g, "").slice(0, 200)}...
      </p>
      <p className="text-sm text-primary">
        {post.category
          .map((cat) => `#${cat}`)
          .join(" ")
          .replace(/_/g, " ")
          .toUpperCase()}
      </p>
    </Link>
  );
}
