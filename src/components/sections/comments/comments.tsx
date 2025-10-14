"use client";

import { useEffect } from "react";

export default function Comments() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "damie824/portfolio");
    script.setAttribute("data-repo-id", "R_kgDONLsiyA");
    script.setAttribute("data-category", "Polls");
    script.setAttribute("data-category-id", "DIC_kwDONLsiyM4CkH_i");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "https://gyuyeon.dev/css/comments.css");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    document.getElementById("comments-container")?.appendChild(script);
  }, []);

  return <div id="comments-container"></div>;
}
