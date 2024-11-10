import Remote from "@/components/sections/blog/remote";
import Share from "@/components/sections/blog/share";
import Comments from "@/components/sections/comments/comments";
import { Mdx } from "@/components/sections/mdx/mdx-components";
import { allPosts } from "@/contentlayer/generated";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getPost(slug: string) {
  const post = allPosts.find((post) => post.slug === slug);
  if (!post) {
    notFound();
  }
  return post;
}

export const generateMetadata = async ({ params }: Props) => {
  const post = await getPost(params.slug.join("/"));
  return {
    title: post.title + " - 규연.데브",
    description: post.description,
    openGraph: {
      title: post.title + " - 규연.데브",
      description: post.description,
      thumbnail: `https://gyuyeon.dev${post.thumbnail}`,
      type: "article",
      locale: "ko_KR",
      url: `https://gyuyeon.dev/blog/${post.slug}`,
      images: [`https://gyuyeon.dev${post.thumbnail}`],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title + " - 규연.데브",
      description: post.description,
      images: [`https://gyuyeon.dev${post.thumbnail}`],
      creator: "@damie824",
    },
  };
};

export default async function BlogPage({ params }: Props) {
  const postId = params.slug.join("/");
  const post = await getPost(postId);

  return (
    <main className="max-w-[900px] mx-auto relative">
      <div className="p-10 mb-5 pt-0 lg:flex lg:justify-between">
        <div>
          <img
            className="w-full mt-10 rounded-md h-32 object-cover"
            src={post.thumbnail}
            alt={post.title}
          />
          <div className="mt-8 py-10">
            <p className="text-sm text-primary mb-2">{post?.category}</p>
            <h1 className="text-4xl font-bold break-keep">{post?.title}</h1>
            <p className="text-sm text-gray-500 mt-8">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Mdx code={post?.body.code || ""} />
          <Share />
        </div>
        <Remote raw={post?.body.raw || ""} />
      </div>
      <div className="p-10">
        <Comments />
      </div>
    </main>
  );
}

// 선택사항: 정적 생성을 위한 경로 설정
export async function generateStaticParams() {
  // 예시: DB나 CMS에서 가져온 경로들
  const routes = [{ slug: ["test", "test"] }, { slug: ["example", "example"] }];

  return routes;
}
