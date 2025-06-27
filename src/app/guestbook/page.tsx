import Comments from "@/components/sections/comments/comments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "방명록 - 규연.데브",
  description: "방명록 페이지입니다. 하고 싶으신 말들을 자유롭게 적어 주세요.",
  openGraph: {
    title: "방명록 - 규연.데브",
    description:
      "방명록 페이지입니다. 하고 싶으신 말들을 자유롭게 적어 주세요.",
    type: "website",
    locale: "ko_KR",
    url: "https://gyuyeon.dev/blog",
  },
  twitter: {
    card: "summary",
    title: "방명록 - 규연.데브",
    description:
      "방명록 페이지입니다. 하고 싶으신 말들을 자유롭게 적어 주세요.",
    creator: "@damie824",
  },
};

export default function Guestbook() {
  return (
    <main className="max-w-[1200px] mx-auto text-center">
      <h1 className="text-4xl mt-14 font-bold uppercase">방명록</h1>
      <p className="text-sm mt-5">
        이 페이지는 자유롭게 하고 싶으신 말을 적을 수 있는
        <br />
        방명록 페이지에요! 자유롭게 하고 싶으신 말들을 적어주세요.
      </p>
      <div className="p-10">
        <Comments />
      </div>
    </main>
  );
}
