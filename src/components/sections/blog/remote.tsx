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

  // 스크롤 위치에 따른 현재 섹션 감지 (scroll 이벤트 리스너 방식)
  useEffect(() => {
    // 스크롤 이벤트를 처리하는 함수
    const handleScroll = () => {
      // 어느 지점을 통과했을 때 섹션을 활성화할지 결정 (화면 상단에서 30% 지점)
      const triggerPoint = window.innerHeight * 0.3;
      let currentActiveId = "";

      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          // 요소의 화면 상단으로부터의 거리를 가져옴
          const rect = element.getBoundingClientRect();

          // 요소의 상단이 트리거 포인트보다 위에 있다면 (즉, 이미 지나쳤다면)
          // 이 헤딩을 현재 활성 섹션 후보로 지정
          if (rect.top <= triggerPoint) {
            currentActiveId = id;
          }
        }
      });

      // 마지막으로 조건을 만족한 헤딩이 현재 섹션이 됨
      // 단, 활성 ID가 실제로 변경되었을 때만 상태 업데이트를 호출하여 불필요한 리렌더링 방지
      if (activeId !== currentActiveId) {
        setActiveId(currentActiveId);
      }
    };

    // scroll 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 해제 (메모리 누수 방지)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings, activeId]); // activeId를 의존성 배열에 추가하여 불필요한 상태 업데이트 방지

  // 특정 헤딩으로 스크롤하는 함수 (이 함수는 변경 없음)
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
