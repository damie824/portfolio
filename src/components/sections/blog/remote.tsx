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
        // 현재 뷰포트 상단 10% 영역에 있는 헤딩들을 필터링하고, 가장 위에 있는 헤딩을 찾습니다.
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleHeadings.length > 0) {
          const newActiveId = visibleHeadings[0].target.id;
          if (newActiveId !== activeId) {
            setActiveId(newActiveId);
          }
        } else {
          // 뷰포트 상단 10% 영역에 어떤 헤딩도 없는 경우 (섹션 사이 또는 문서의 맨 위/아래)
          // 뷰포트 상단을 이미 지나간 헤딩 중 가장 마지막 헤딩을 찾아서 활성화합니다.
          const allHeadingElements = headings
            .map((h) => document.getElementById(h.id))
            .filter(Boolean) as HTMLElement[];

          let newActiveId = "";
          // 뒤에서부터 순회하여 뷰포트 상단 경계를 넘어선 마지막 헤딩을 찾습니다.
          for (let i = allHeadingElements.length - 1; i >= 0; i--) {
            const headingElement = allHeadingElements[i];
            // 헤딩의 상단이 뷰포트의 상단보다 위에 있다면 (즉, 이미 지나갔다면)
            if (headingElement.getBoundingClientRect().top < 0) {
              newActiveId = headingElement.id;
              break;
            }
          }

          if (newActiveId !== activeId) {
            setActiveId(newActiveId);
          }
        }
      },
      {
        // rootMargin을 조정하여 헤딩이 뷰포트 상단 10% 영역에 들어올 때 활성화되도록 합니다.
        // 이는 뷰포트 상단에 "트리거 라인"을 생성합니다.
        rootMargin: "-10% 0px -90% 0px",
        threshold: 0 // 요소의 어떤 부분이든 rootMargin에 들어오면 트리거
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
  }, [headings, activeId]);

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
    const currentSection = [0, 0, 0, 0, 0, 0]; // h1~h6까지 지원

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
