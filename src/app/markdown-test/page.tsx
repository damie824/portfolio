"use client";

import { allPosts } from "@/../.contentlayer/generated";
import { Mdx } from "@/components/sections/mdx/mdx-components";
import { useMDXComponent } from "next-contentlayer/hooks";

export default function Test() {
  // allPosts가 비어있는 배열인 것 같습니다.
  // .contentlayer/generated/Post/_index.mjs 파일을 보면 allPosts = [] 로 되어있네요.
  console.log("모든 포스트:", allPosts); // 디버깅을 위해 로그 추가

  const post = allPosts[0];
  if (!post) {
    console.log("포스트를 찾을 수 없습니다"); // 디버깅을 위해 로그 추가
    return <div>포스트를 찾을 수 없습니다</div>;
  }

  // Post 타입 정의를 보면 body는 Markdown 타입이고 raw 속성이 없습니다
  const MDXComponent = useMDXComponent(post.body.code);

  return (
    <div className="max-w-[800px] mx-auto p-10">
      <h1>테스트</h1>
      {post.slug}
      <Mdx code={post.body.code} />
    </div>
  );
}
