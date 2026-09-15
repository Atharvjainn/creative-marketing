import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { getPayloadClient } from "@/lib/payload";
import SmoothScroll from "@/components/animations/SmoothScroll";
import "./globals.css";
import GsapScroll from "@/components/animations/GSAPScroll";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient().catch(() => null);
  const siteSettings = payload
    ? await payload.findGlobal({ slug: "site-settings" }).catch(() => null)
    : null;

  const title =
    siteSettings?.metaTitle ||
    "Creative Marketing Agency | Next-Gen AI Marketing Solutions";
  const description =
    siteSettings?.metaDescription ||
    "Elevate your marketing with AI Solutions. Discover how our AI-driven strategies transform your marketing with unparalleled efficiency.";

  let ogImageUrl = "";
  if (
    typeof siteSettings?.ogImage === "object" &&
    siteSettings.ogImage &&
    "url" in siteSettings.ogImage &&
    typeof siteSettings.ogImage.url === "string"
  ) {
    ogImageUrl = siteSettings.ogImage.url;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={dmSans.className}>
        <GsapScroll />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
