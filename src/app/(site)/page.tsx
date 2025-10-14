import HomeTyper from "@/components/sections/home/typer";
import Image from "next/image";
import Link from "next/link";
import { allPosts, Post } from "@/contentlayer/generated";

import minimo from "$/profile/minimo.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "규연.데브",
  description:
    "창의적이고 혁신적인 개발자, 이규연의 포트폴리오에 오신 것을 환영합니다. 다양한 프로젝트와 기술을 통해 창의성을 발휘하며, 끊임없이 새로운 도전을 추구합니다.",
  openGraph: {
    title: "규연.데브",
    description:
      "창의적이고 혁신적인 개발자, 이규연의 포트폴리오에 오신 것을 환영합니다. 다양한 프로젝트와 기술을 통해 창의성을 발휘하며, 끊임없이 새로운 도전을 추구합니다.",
    type: "website",
    locale: "ko_KR",
    url: "https://gyuyeon.dev/blog",
  },
  twitter: {
    card: "summary",
    title: "규연.데브",
    description:
      "창의적이고 혁신적인 개발자, 이규연의 포트폴리오에 오신 것을 환영합니다. 다양한 프로젝트와 기술을 통해 창의성을 발휘하며, 끊임없이 새로운 도전을 추구합니다.",
    creator: "@damie824",
  },
};

export default function Home() {
  const posts = allPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main>
      <section className="max-w-[1200px] sm:px-20 relative flex mx-auto h-[300px] py-10 overflow-hidden justify-center sm:justify-start sm:items-end">
        <div className="flex flex-col gap-5 items-center sm:items-start">
          <div className="text-3xl flex flex-col items-center sm:items-start sm:text-4xl font-bold">
            <p className="text-sm mb-2 font-normal text-white/50">
              gyuyeon.dev
            </p>
            <h2>안녕하세요,</h2>
            <HomeTyper />
            <h2>이규연입니다.</h2>
          </div>
          <div className="flex gap-1">
            <Link
              href="/about"
              className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm hover:opacity-80 transition-opacity"
            >
              About
            </Link>
            <Link
              href="/profile"
              className="border-border border px-3 py-1 rounded-md text-sm hover:bg-border transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <Image
          src={minimo}
          alt="minimo"
          className="w-[400px] h-[400px] absolute bottom-[-150px] right-[0px] hidden sm:block"
        />
      </section>
      <section
        className="bg-neutral-950"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
        }}
      >
        <div className="max-w-[1100px] mx-auto p-10 pb-16">
          <h3 className="text-3xl font-bold">Main Skills</h3>
          <p className="text-sm text-white/50 mt-2">
            제가 가장 잘 다루는 기술들을 소개해드릴게요!
          </p>
          <div className="flex gap-3 flex-col my-5">
            <Skill name="React" percent={90} />
            <Skill name="Next.js" percent={87} />
            <Skill name="Typescript" percent={80} />
            <Skill name="Rust" percent={71} />
            <Skill name="Springboot" percent={52} />
            <Skill name="C#" percent={48} />
          </div>
        </div>
      </section>
      <section className="py-10 px-3 text-center">
        <h2 className="text-3xl font-bold text-center">Recent Posts</h2>
        <div className="flex flex-col gap-5 my-10 text-start sm:w-[80%] mx-auto max-w-[1100px]">
          {posts.slice(0, 2).map((post, i) => (
            <Posts key={i} post={post} />
          ))}
          <Link href="/blog" className="text-white/50 text-sm text-center mt-5">
            More...
          </Link>
        </div>
      </section>
      <section className="p-3 max-w-[1100px] md:p-10 mx-auto">
        <h2 className="text-xl font-bold mx-auto px-5">본업할 땐 좀 간지 남</h2>
        <div className="flex flex-col gap-5 my-10 text-start mx-auto max-w-[1100px]">
          {posts
            .filter((post) => post.category.includes("개발"))
            .slice(0, 2)
            .map((post, i) => (
              <Posts key={i} post={post} />
            ))}
          <Link
            href="/blog?category=%EA%B0%9C%EB%B0%9C"
            className="text-white/50 text-sm mx-auto w-fit mt-5"
          >
            More...
          </Link>
        </div>
      </section>
      <section className="p-3 md:p-10 max-w-[1100px] mx-auto">
        <h2 className="text-xl font-bold mx-auto px-5">
          일 안 할 땐 보통 이러고 놀아요
        </h2>
        <div className="flex flex-col gap-5 my-10 text-start mx-auto">
          {posts
            .filter((post) => post.category.includes("일상"))
            .slice(0, 2)
            .map((post, i) => (
              <Posts key={i} post={post} />
            ))}
          <Link
            href="/blog?category=%EC%9D%BC%EC%83%81"
            className="text-white/50 text-sm mx-auto w-fit mt-5"
          >
            More...
          </Link>
        </div>
      </section>
    </main>
  );
}

function Skill({ name, percent }: { name: string; percent: number }) {
  return (
    <div className="flex gap-2 w-full flex-col sm:flex-row sm:items-center">
      <p className="text-sm w-32">{name}</p>
      <div className="w-full h-[5px] bg-neutral-800 rounded-full">
        <div
          className="h-[5px] bg-primary rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

function Posts({ post }: { post: Post }) {
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
