import { allPortfolios } from "@/contentlayer/generated";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "포트폴리오 - 규연.데브",
  description:
    "포트폴리오 페이지입니다. 제가 지금까지 제작한 여러 프로젝트들과 코드들을 만나보세요.",
  openGraph: {
    title: "포트폴리오 - 규연.데브",
    description:
      "포트폴리오 페이지입니다. 제가 지금까지 제작한 여러 프로젝트들과 코드들을 만나보세요.",
    type: "website",
    locale: "ko_KR",
    url: "https://gyuyeon.dev/blog",
  },
  twitter: {
    card: "summary",
    title: "포트폴리오 - 규연.데브",
    description:
      "포트폴리오 페이지입니다. 제가 지금까지 제작한 여러 프로젝트들과 코드들을 만나보세요.",
    creator: "@damie824",
  },
};

export default function Portfolio() {
  const portfolios = allPortfolios;

  return (
    <main className="max-w-[900px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {portfolios
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((portfolio, index) => {
            return (
              <div
                key={index}
                className="bg-neutral-900 rounded-lg overflow-hidden"
              >
                <img
                  className="w-full h-40 object-cover"
                  src={portfolio.thumbnail}
                />
                <div className=" p-6">
                  <div className="flex gap-2">
                    {portfolio.tags?.map((tag, index) => (
                      <p className="text-sm text-primary" key={index}>
                        {tag}
                      </p>
                    ))}
                  </div>
                  <h3 className="font-bold text-xl">{portfolio.title}</h3>
                  <p className="text-sm text-white/40">
                    {portfolio.description}
                  </p>
                  <div className="flex gap-2 justify-end">
                    {Object.keys(portfolio.url).map((key) => (
                      <a
                        href={portfolio.url[key]}
                        key={key}
                        className="text-xs"
                      >
                        {key}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
