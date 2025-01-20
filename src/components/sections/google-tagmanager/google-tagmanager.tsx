"use client";
import { useEffect } from "react";

export default function GoogleTagManager() {
  useEffect(() => {
    (function (w: any, d: Document, s: string, l: string, i: string) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0] as HTMLElement,
        j = d.createElement(s) as HTMLScriptElement,
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode!.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-KGZ225JT");
  }, []);

  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-KGZ225JT"
        height="0"
        width="0"
        className="hidden invisible"
      ></iframe>
    </noscript>
  );
}
