import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Site Up",
  description: "Թավային հրավիրատոմսեր",
  openGraph: {
    title: "Site Up",
    description: "Թավային հրավիրատոմսեր",
    url: "https://siteup-am.vercel.app",
    siteName: "siteup.am",
    images: [
      {
        url: "/img1.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#ffffff] text-color mx-auto max-w-md ">
        <Header/>
        <Analytics/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
