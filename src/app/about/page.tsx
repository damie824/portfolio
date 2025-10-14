import profileImg from "$/profile/profile.jpeg";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

export const metadata: Metadata = {
  title: "어바웃 - 규연.데브",
  description: "개발자로서의 경험을 꾹꾹 눌러담은 글들을 모아봤어요.",
  openGraph: {
    title: "블로그 - 규연.데브",
    description: "개발자로서의 경험을 꾹꾹 눌러담은 글들을 모아봤어요.",
    type: "website",
    locale: "ko_KR",
    url: "https://gyuyeon.dev/blog",
  },
  twitter: {
    card: "summary",
    title: "블로그 - 규연.데브",
    description: "개발자로서의 경험을 꾹꾹 눌러담은 글들을 모아봤어요.",
    creator: "@damie824",
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-[1200px] mx-auto pt-20 p-5 md:p-20">
      <section>
        <h1 className="0 text-3xl font-bold">이규연 | Damie Lee</h1>
        <div className="flex justify-around mt-16">
          <Image
            className="w-56 h-56 mx-8 object-cover rounded-full border hidden md:block"
            src={profileImg}
            alt="profile"
          />
          <div className="flex-1">
            <h4 className="text-xl text-primary mb-3">Information</h4>
            <div className="w-full h-[1px] bg-border my-3"></div>
            <ul>
              <li className="flex gap-5 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                  />
                </svg>
                <p>2006.08.24</p>
              </li>
              <li className="flex gap-5 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <p>경기도 수원시</p>
              </li>
            </ul>
            <h4 className="text-xl text-primary mb-3 mt-4">Contact</h4>
            <div className="w-full h-[1px] bg-border my-3"></div>
            <ul>
              <li className="flex gap-5 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                  />
                </svg>
                <Link href={"mailTo:lee@gyuyeon.dev"}>lee@gyuyeon.dev</Link>
              </li>
              <li className="flex gap-5 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
                <Link href={"tel:010-4055-1202"}>010-4055-1202</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <h4 className="text-xl text-primary">안녕하세요!</h4>
        <div className="w-full h-[1px] bg-border my-3"></div>
        <p>
          풀 스택 개발자 지망생인 <span className="font-bold">이규연</span>
          이라고 합니다.
          <br />
          웹, 앱, 네이티브, 서버 등 많은 분야에서 활동하고 있습니다.
          <br />
          <br />
          전 제 지식을 늘려나가는 것을 좋아합니다.
          <br />
          지금 다룰 수 있는 것들보다 더욱 어렵고, 깊은 분야를 끊임없이
          공부해나가고 싶습니다.
          <br />
        </p>
      </section>
      <section className="mt-10">
        <h4 className="text-xl text-primary">Projects</h4>
        <div className="w-full h-[1px] bg-border my-3"></div>
        <ProjectList>
          <ProjectList.Item date="2024.08 - Now">
            <PortfolioItem
              title="Gyuyeon Portfolio"
              desc="포트폴리오 리브랜딩 프로젝트입니다."
              href="/"
            />
          </ProjectList.Item>
          <ProjectList.Item date="2024.06 - 2024.07">
            <PortfolioItem
              title="Damie Labs v2"
              desc="두 번째 포트폴리오 웹사이트 프로젝트입니다."
              href="https://v2.gyuyeon.dev/"
            />
          </ProjectList.Item>
          <ProjectList.Item date="2024.03 - 2024.06">
            <PortfolioItem
              title="Odinus Project"
              desc="인디 게이밍 런처 개발 프로젝트입니다."
              href="https://web-project-odin.vercel.app/"
            />
          </ProjectList.Item>
          <ProjectList.Item date="2023.11 - 2023.12">
            <PortfolioItem
              title="DPUS"
              desc="대평고 학생들을 위한 커뮤니티 사이트입니다."
              href="https://github.com/damie824/dpus-frontend"
            />
          </ProjectList.Item>
          <ProjectList.Item date="2023.10 - 2023.10">
            <PortfolioItem
              title="Dphs Adviser"
              desc="학교의 급식, 시간표 등을 전달하는 어플리케이션입니다."
              href="https://github.com/damie824/dphs-adviser-app"
            />
          </ProjectList.Item>
          <ProjectList.Item date="2023.10 - 2023.10">
            <PortfolioItem
              title="Damie Labs v1"
              desc="첫 포트폴리오 웹사이트 프로젝트입니다."
              href="https://v1.gyuyeon.dev/"
            />
          </ProjectList.Item>
        </ProjectList>
      </section>
      <section className="mt-10">
        <h4 className="text-xl text-primary">Educations</h4>
        <div className="w-full h-[1px] bg-border my-3"></div>
        <ProjectList>
          <ProjectList.Item date="2025.05 -">
            <p>아르카디아</p>
          </ProjectList.Item>
          <ProjectList.Item date="2025.03 -">
            <p>디버거즈(청강문화산업대학교 학생회)</p>
          </ProjectList.Item>
          <ProjectList.Item date="2025.03 -">
            <p>청강문화산업대학교</p>
          </ProjectList.Item>
          <ProjectList.Item date="2022.03 - 2025.03">
            <p>대평고등학교</p>
          </ProjectList.Item>
        </ProjectList>
      </section>
    </main>
  );
}

function ProjectList({
  children = [<></>],
}: {
  children?: ReactElement<typeof ProjectList.Item>[];
}) {
  return (
    <div className="relative md:border-l-border md:border-l-2 md:mx-5 my-5">
      {children}
    </div>
  );
}

ProjectList.Item = ({
  date,
  children,
}: {
  date: string;
  children?: ReactElement;
}) => {
  return (
    <div className="flex py-4 md:px-5 items-center">
      <div className="w-3 h-3 border-2 border-border rounded-full absolute left-[-7px] bg-background hidden md:block"></div>
      <div className="flex mt-[-2px] flex-col md:flex-row md:items-center">
        <div className="w-44 text-border text-xs mb-1 md:mb-0 md:text-base">
          <p>{date}</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

function PortfolioItem({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <div>
      <div className="flex gap-3 items-center">
        <p className="font-bold">{title}</p>
        <Link
          className="text-sm flex items-center gap-1 text-border"
          href={href}
        >
          Link
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>
        </Link>
      </div>
      <p className="text-border text-xs md:text-sm">{desc}</p>
    </div>
  );
}
