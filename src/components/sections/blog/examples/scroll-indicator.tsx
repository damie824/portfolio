"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollIndicatorExample() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;
      const scrollTop = scrollElement.scrollTop;
      const scrollHeight =
        scrollElement.scrollHeight - scrollElement.clientHeight;
      setScrollPercent((scrollTop / scrollHeight) * 100);
    };
    scrollRef.current?.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-full relative bg-background overflow-hidden rounded-md">
      <div className="left-0 w-full h-1 bg-neutral-800 absolute top-0">
        <div
          className="h-full bg-primary"
          style={{
            width: `${scrollPercent}%`,
          }}
        />
      </div>
      <div
        className="p-5 h-full overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:absolute [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full"
        ref={scrollRef}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="mb-5 p-4 rounded-lg bg-neutral-800/20">
            스크롤 테스트를 위한 {i + 1}번째 컨텐츠입니다.
          </div>
        ))}
      </div>
    </div>
  );
}
