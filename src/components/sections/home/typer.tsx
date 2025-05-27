"use client";
import { TypeAnimation } from "react-type-animation";

export default function HomeTyper() {
  return (
    <div className="flex items-center">
      <div className="text-primary">
        <TypeAnimation
          sequence={[
            "리액트",
            3000,
            "웹사이트",
            3000,
            "애플리케이션",
            3000,
            "서버",
            3000,
            "스프링",
            3000,
            "네스트",
            3000,
          ]}
          repeat={Infinity}
          cursor={false}
        />
      </div>
      <div className="w-[1px] h-7 md:h-8 ml-1 mb-[-4px] mr-2 bg-white animate-typewriter-cursor"></div>
      <h2>개발자</h2>
    </div>
  );
}
