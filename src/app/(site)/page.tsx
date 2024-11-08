import HomeTyper from "@/components/sections/home/typer";
import Link from "next/link";
import Image from "next/image";

import minimo from "$/profile/minimo.png";

export default function Home() {
  return (
    <main>
      <section className="max-w-[800px] relative flex mx-auto p-10 overflow-hidden">
        <div className="flex flex-col gap-10 items-center sm:items-start">
          <div className="text-3xl flex flex-col items-center sm:items-start sm:text-4xl font-bold">
            <h2>안녕하세요,</h2>
            <HomeTyper />
            <h2>이규연입니다.</h2>
          </div>
          <div className="flex"></div>
        </div>
        <div className="w-40 h-40">
          <Image
            src={minimo}
            alt="minimo"
            className="w-56 h-56 absolute bottom-[-40px] right-24"
          />
        </div>
      </section>
    </main>
  );
}
