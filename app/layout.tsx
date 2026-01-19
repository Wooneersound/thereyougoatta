import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // 🔥 이 줄이 없으면 배경색이 안 바뀝니다! 꼭 있어야 해요.

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atta Official",
  description: "Alternative Producing Team Atta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}