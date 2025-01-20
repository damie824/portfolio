"use client";
import { useEffect, useState } from "react";

export default function Remote({ raw }: { raw?: string }) {
  // 헤딩 정보를 저장하는 상태 (레벨, 텍스트, id)
  const [headings, setHeadings] = useState<
    { level: number; text: string; id: string }[]
  >([]);
  // 현재 활성화된(보고 있는) 헤딩의 id
  const [activeId, setActiveId] = useState<string>("");

  // 마크다운 텍스트에서 헤딩 정보를 추출하는 함수
  const extractHeadings = (code: string) => {
    const headings: { level: number; text: string; id: string }[] = [];
    const lines = code.split("\n");

    for (const line of lines) {
      const trimmedLine = line.trimStart();

      // '#' 으로 시작하는 라인(헤딩)을 찾음
      if (trimmedLine.startsWith("#")) {
        const level = trimmedLine?.match(/^#+/)?.[0]?.length || 0;
        const text = trimmedLine.slice(level).trim();

        // HTML 태그, 마크다운 링크, 특수문자 등을 제거하여 깨끗한 텍스트 추출
        const cleanText = text
          .replace(/<[^>]*>/g, "") // HTML 태그 제거
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // 마크다운 링크에서 텍스트만 추출
          .replace(/[*_`]/g, "") // 마크다운 서식 문자 제거
          .replace(/[^\w\s가-힣]/g, ""); // 특수문자 제거

        // id 생성을 위한 텍스트 정제
        const id = cleanText
          .toLowerCase()
          .replace(/[^가-힣a-z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");

        headings.push({ level, text: cleanText, id });
      }
    }

    return headings;
  };

  // raw 마크다운이 변경될 때마다 헤딩 추출
  useEffect(() => {
    setHeadings(extractHeadings(raw || ""));
  }, [raw]);

  // 스크롤 위치에 따른 현재 섹션 감지
  useEffect(() => {
    // Intersection Observer 설정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 요소가 화면에 보이면 해당 id를 활성 id로 설정
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        // 상단 20%, 하단 80%의 여백을 둠으로써
        // 헤딩이 화면 중앙 부근에 왔을 때 활성화되도록 설정
        rootMargin: "-20% 0px -80% 0px",
      }
    );

    // 모든 헤딩 요소에 대해 observer 설정
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // 컴포넌트 언마운트 시 observer 해제
    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  // 특정 헤딩으로 스크롤하는 함수
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 헤딩의 계층 구조에 따른 번호 생성 함수
  const getNumbering = (index: number, level: number) => {
    let numbering = "";
    let currentSection = [0, 0, 0, 0, 0, 0]; // h1~h6까지 지원

    for (let i = 0; i <= index; i++) {
      const currentHeading = headings[i];
      currentSection[currentHeading.level - 1]++;

      // 하위 레벨 초기화
      for (let j = currentHeading.level; j < currentSection.length; j++) {
        currentSection[j] = 0;
      }
    }

    // 현재 헤딩 레벨까지의 넘버링 생성
    for (let i = 0; i < level; i++) {
      if (currentSection[i] !== 0) {
        numbering += currentSection[i] + ".";
      }
    }

    return numbering;
  };

  return (
    <div className="sticky top-32 h-fit hidden lg:block">
      <nav className="flex flex-col gap-2">
        {headings.map((heading, index) => (
          <button
            key={index}
            onClick={() => scrollToHeading(heading.id)}
            className={`text-left hover:text-primary transition-colors ${
              heading.level === 1
                ? "font-bold"
                : heading.level === 2
                ? "ml-4 text-sm"
                : "ml-8 text-xs"
            } ${activeId === heading.id ? "text-primary" : ""}`}
          >
            {getNumbering(index, heading.level)} {heading.text}
          </button>
        ))}
      </nav>
    </div>
  );
}
