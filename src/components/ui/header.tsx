"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef) {
      return;
    }

    setHeaderHeight(headerRef.current?.offsetHeight || 0);
  }, [headerRef]);

  return (
    <>
      <header
        className="fixed w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 z-50"
        style={{
          borderBottom: scrolled ? "1px solid var(--border)" : "",
          backgroundColor: scrolled ? "#0b0b0bda" : "",
          transition: "background-color 300ms ease-in-out",
        }}
        ref={headerRef}
      >
        <div className="max-w-[1200px] mx-auto p-5">
          <div className="flex uppercase justify-between items-center">
            <Link href={"/"}>
              <h1 className="font-black flex">
                G<span className="hidden sm:block">yu</span>y
                <span className="hidden sm:block mr-2">eon</span>L
                <span className="hidden sm:block">ee</span>
              </h1>
            </Link>
            <div className="flex gap-3 text-xs sm:text-sm">
              <Link href={"/about"}>About</Link>
              <Link href={"/blog"}>Blog</Link>
              <Link href={"/portfolio"}>Portfolio</Link>
              <Link className="hidden sm:block" href={"/guestbook"}>
                Guestbook
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div
        style={{
          height: `${headerHeight}px`,
        }}
      ></div>
      <div
        className="fixed left-0 h-[1px] bg-primary z-50"
        style={{
          top: `${headerHeight}px`,
          width: `${scrollProgress}%`,
        }}
      ></div>
    </>
  );
}
