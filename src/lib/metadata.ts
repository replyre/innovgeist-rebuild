import type { Metadata } from "next";

const baseUrl = "https://innovgeist.com";

export const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Innovgeist - Revenue Automation Engineering",
    template: "%s | Innovgeist",
  },
  description:
    "Innovgeist engineers revenue automation systems that drive real conversions. We partner with growth-focused companies to build intelligent pipelines.",
  keywords: [
    "revenue automation",
    "lead generation",
    "conversion optimization",
    "marketing automation",
    "growth engineering",
    "sales pipeline automation",
    "AI-powered marketing",
    "revenue operations",
  ],
  authors: [{ name: "Innovgeist", url: baseUrl }],
  creator: "Innovgeist",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Innovgeist",
    title: "Innovgeist - Revenue Automation Engineering",
    description:
      "Innovgeist engineers revenue automation systems that drive real conversions. We partner with growth-focused companies to build intelligent pipelines.",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Innovgeist Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Innovgeist - Revenue Automation Engineering",
    description:
      "Innovgeist engineers revenue automation systems that drive real conversions.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};
