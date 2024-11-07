import HomeTyper from "@/components/sections/home/typer";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="max-w-[900px] mx-auto p-10">
        <div className="flex flex-col gap-10 items-center md:items-start">
          <div className="text-3xl flex flex-col items-center md:items-start md:text-4xl font-bold">
            <h2>안녕하세요,</h2>
            <HomeTyper />
            <h2>이규연입니다.</h2>
          </div>
          <div className="flex"></div>
        </div>
      </section>
    </main>
  );
}
