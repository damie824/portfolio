/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";

interface DataLayerObject {
  "gtm.start"?: number;
  event: string;
  [key: string]: any; // Allow other properties
}

declare global {
  interface Window {
    dataLayer: DataLayerObject[];
  }
}

export default function GoogleTagManager() {
  useEffect(() => {
    (function (w: Window, d: Document, s: string, l: string, i: string) {
      const dataLayer = (w as any)[l] as any[] || []; // Initialize dataLayer here
      dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      const f = d.getElementsByTagName(s)[0] as HTMLElement,
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
