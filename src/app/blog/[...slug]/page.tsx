import Remote from "@/components/sections/blog/remote";
import Share from "@/components/sections/blog/share";
import Comments from "@/components/sections/comments/comments";
import { Mdx } from "@/components/sections/mdx/mdx-components";
import { allPosts } from "@/contentlayer/generated";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

async function getPost(slug: string) {
  const post = allPosts.find((post) => post.slug === slug);
  if (!post) {
    notFound();
  }
  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPost((await params).slug.join("/"));
    return {
      title: post.title + " - 규연.데브",
      description: post.description,
      openGraph: {
        title: post.title + " - 규연.데브",
        description: post.description,
        type: "article",
        locale: "ko_KR",
        url: `https://gyuyeon.dev/blog/${post.slug}`,
        images: post.thumbnail ? [`https://gyuyeon.dev${post.thumbnail}`] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title + " - 규연.데브",
        description: post.description,
        images: post.thumbnail ? [`https://gyuyeon.dev${post.thumbnail}`] : [],
        creator: "@damie824",
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "규연.데브",
    };
  }
}

export default async function BlogPage({ params }: Props) {
  try {
    const postId = (await params).slug.join("/");
    const post = await getPost(postId);

    if (!post) {
      notFound();
    }

    return (
      <main className="max-w-[1200px] mx-auto relative">
        <div className="md:p-10 px-3 py-10 mb-5 pt-0 lg:flex lg:justify-between">
          <div className="w-full lg:w-[800px]">
            <img
              className="w-full mt-10 rounded-md h-32 object-cover"
              src={post.thumbnail}
              alt={post.title}
            />
            <div className="mt-8 py-10">
              <div className="text-sm text-primary mb-2 flex gap-3">
                {post?.category.map((category, index) => {
                  return (
                    <Link key={index} href={`/blog?category=${category}`}>
                      {category}
                    </Link>
                  );
                })}
              </div>
              <h1 className="text-4xl font-bold break-keep">{post?.title}</h1>
              <p className="text-sm text-gray-500 mt-2">
                <Link href={"/"}>Gyuyeon Lee</Link> -{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Mdx code={post?.body.code || ""} />
            <Share title={post?.title || ""} />
          </div>
          <Remote raw={post?.body.raw || ""} />
        </div>
        <div className="p-3 md:p-10">
          <Comments />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Blog page render error:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}
