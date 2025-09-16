"use client";

import * as runtime from 'react/jsx-runtime';
import * as React from "react";
import Examples from "../blog/examples";
import Image from "next/image";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const Pre = ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    const uniqueId = `pre-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setId(uniqueId);
  }, []);

  return (
    <pre
      id={id}
      className={`relative my-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 font-mono text-sm leading-[1.5] [color-scheme:dark] ${className || ""}`}
      {...props}
    >
      <div className="absolute right-4 top-4 flex items-center space-x-2">
        <button
          className="hover:bg-white/20 rounded p-2 transition-colors"
          onClick={() => {
            const preElement = document.getElementById(id);
            const codeElement = preElement?.querySelector("code");
            const code = codeElement?.textContent || "";

            const watermark = `\n\nThis code is from https://gyuyeon.dev.`;

            console.log(code + watermark);

            navigator.clipboard.writeText(code + watermark);

            const toast = document.createElement("div");
            toast.className =
              "fixed bottom-[-100px] right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg transition-all duration-300";
            toast.textContent = "코드가 복사되었습니다!";

            setTimeout(() => {
              toast.style.bottom = "1rem";
            }, 100);

            document.body.appendChild(toast);

            setTimeout(() => {
              toast.style.opacity = "0";
              setTimeout(() => {
                document.body.removeChild(toast);
              }, 300);
            }, 3000);
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
      </div>
      {props.children}
    </pre>
  );
};

const components = {
  h1: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <>
      <h1
        id={
          typeof children === "string"
            ? children.toLowerCase().replace(/\s+/g, "-")
            : ""
        }
        className={`font-heading scroll-m-20 text-4xl font-bold mt-6 ${className || ""}`}
        {...props}
      >
        {children}
      </h1>
      <hr className="w-full h-[1px] border-white/20 my-2"></hr>
    </>
  ),
  h2: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <>
      <h2
        id={
          typeof children === "string"
            ? children.toLowerCase().replace(/\s+/g, "-")
            : ""
        }
        className={`font-heading scroll-m-20 text-3xl font-bold mt-6 ${className || ""}`}
        {...props}
      >
        {children}
      </h2>
      <hr className="w-full h-[1px] border-white/20 my-2"></hr>
    </>
  ),
  h3: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <>
      <h3
        id={
          typeof children === "string"
            ? children.toLowerCase().replace(/\s+/g, "-")
            : ""
        }
        className={`font-heading scroll-m-20 text-2xl font-bold mt-6 ${className || ""}`}
        {...props}
      >
        {children}
      </h3>
      <hr className="w-full h-[1px] border-white/20 my-2"></hr>
    </>
  ),
  h4: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      id={
        typeof children === "string"
          ? children.toLowerCase().replace(/\s+/g, "-")
          : ""
      }
      className={`font-heading scroll-m-20 text-xl font-bold mt-6 ${className || ""}`}
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      id={
        typeof children === "string"
          ? children.toLowerCase().replace(/\s+/g, "-")
          : ""
      }
      className={`font-heading scroll-m-20 text-lg font-bold mt-6 ${className || ""}`}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      id={
        typeof children === "string"
          ? children.toLowerCase().replace(/\s+/g, "-")
          : ""
      }
      className={`font-heading mcroll-m-20 text-base font-bold mt-6 ${className || ""}`}
      {...props}
    >
      {children}
    </h6>
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <code className={`rounded-md ${className || ""}`} {...props} />
  ),
  pre: Pre,
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={`ml-6 list-decimal marker:text-neutral-500 ${className || ""}`} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={`ml-6 list-disc marker:text-neutral-500 ${className || ""}`} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={`mt-6 bg-neutral-800/20 flex gap-5 flex-wrap h-fit overflow-hidden relative ${className || ""}`}
      {...props}
    >
      <div className="w-1 h-full bg-primary self-stretch absolute left-0"></div>
      <div className="text-sm h-fit ml-5">{props.children}</div>
    </blockquote>
  ),
  hr: () => <hr className="w-full h-[1px] border-white/20 my-2"></hr>,
  a: ({
    className,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http") || href?.startsWith("https");
    return (
      <a
        className={`text-primary hover:underline ${className || ""}`}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        href={href}
        {...props}
      />
    );
  },
  input: ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    if (props.type === "checkbox") {
      return (
        <input
          type="checkbox"
          className="mr-2 h-4 w-4 accent-primary"
          {...props}
        />
      );
    }
    return <input {...props} />;
  },
  li: ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => {
    const isCheckboxItem =
      props.children?.toString().startsWith("[ ] ") ||
      props.children?.toString().startsWith("[x] ");

    if (isCheckboxItem) {
      const checked = props.children?.toString().startsWith("[x] ");
      const text = props.children?.toString().substring(4);

      return (
        <li className={`flex items-center gap-2 ${className || ""}`}>
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className={`mr-2 h-4 w-4 accent-primary border border-neutral-700 checked:border-none rounded-sm pointer-events-none ${
              checked ? "bg-primary" : "bg-transparent appearance-none"
            }`}
          />
          <span>{text}</span>
        </li>
      );
    }

    return <li className={className} {...props} />;
  },
  img: ({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      className={`rounded-md md:max-w-[500px] ${className || ""}`}
      {...props}
      alt={props.alt || ""}
      src={props.src || ""} // Ensure src is always a string
      width={700}
      height={400}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={`my-5 ${className || ""}`} {...props} />
  ),
  Examples: ({ id }: { id: string }) => <Examples id={id} />,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="break-keep mb-10">
      <Component components={components} />
    </div>
  );
}
