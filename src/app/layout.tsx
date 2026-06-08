import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import ApolloSetting from "@/commons/settings/apollo-setting";
import LayoutComponent from "@/commons/layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Trip Trip!",
  description: "유용한 여행정보를 알려드립니다!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloSetting>
          <LayoutComponent>{children}</LayoutComponent>
          {/* <div className="mt-10 mb-10 max-w-7xl mx-auto px-10">{children}</div> */}
        </ApolloSetting>
      </body>
    </html>
  );
}
