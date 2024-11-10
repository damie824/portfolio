import Comments from "@/components/sections/comments/comments";

export default function Guestbook() {
  return (
    <main className="max-w-[800px] mx-auto text-center">
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
