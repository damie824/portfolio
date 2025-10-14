import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.css";
import GlobalHeader from "@/components/ui/header";
import GlobalFooter from "@/components/ui/footer";
import GoogleTagManager from "@/components/sections/google-tagmanager/google-tagmanager";

const notoSans = Noto_Sans_KR({
  variable: "--noto-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} antialiased`}>
        <GlobalHeader />
        {children}
        <GlobalFooter />
        <GoogleTagManager />
      </body>
    </html>
  );
}
