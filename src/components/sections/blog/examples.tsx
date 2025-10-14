"use client";

import Link from "next/link";
import ScrollIndicatorExample from "./examples/scroll-indicator";

const examples: { id: string; component: React.ReactNode }[] = [
  {
    id: "scroll-indicator",
    component: <ScrollIndicatorExample />,
  },
];

export default function Examples({ id }: { id: string }) {
  return (
    <>
      <div className="w-full h-96 rounded-md border-border border overflow-hidden relative">
        <p className="text-xs text-muted-foreground absolute text-end bottom-5 right-5 z-30 opacity-50 leading-relaxed">
          Powered By{" "}
          <Link className="underline" href="https://gyuyeon.dev/">
            Gyuyeon.dev
          </Link>
          <br />
          Source code is available on{" "}
          <Link
            href={`https://github.com/damie824/portfolio/tree/main/src/components/sections/blog/examples/${id}.tsx`}
            className="underline"
            target="_blank"
          >
            Github
          </Link>
        </p>
        {examples.find((example) => example.id === id)?.component ?? (
          <p>예시를 찾을 수 없었어요..</p>
        )}
      </div>
    </>
  );
}
