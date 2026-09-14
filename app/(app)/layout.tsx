import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Creative Marketing Agency – AI-Powered Marketing Solutions",
  description:
    "Elevate your marketing with AI Solutions. Discover how our AI-driven strategies transform your marketing, delivering unparalleled results and efficiency. Trusted by 10k+ businesses.",
  openGraph: {
    title: "Creative Marketing Agency – AI-Powered Marketing Solutions",
    description: "Elevate your marketing with AI Solutions. Trusted by 10k+ businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
