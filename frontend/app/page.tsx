import type { Metadata } from "next";
import HeroSection from "../src/sections/HeroSection";
import FeaturedCategoriesSection from "@/src/sections/FeaturedCategoriesSection";
import TrendingSection from "@/src/sections/TrendingSection";
import NewsletterSection from "@/src/sections/NewsletterSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://topickler.netlify.app"),

  title:
    "Topicler | Blogs on Politics, Finance, Real Estate, Technology & More",

  description:
    "Topicler is your go-to platform for expert blogs on Politics, Finance, Real Estate, Technology, Plumbing, Digital Marketing, and Home Improvement. Stay updated with trending insights.",

  keywords: [
    "Topicler",
    "politics blogs",
    "finance articles",
    "real estate insights",
    "technology blogs",
    "plumbing tips",
    "digital marketing strategies",
    "home improvement ideas",
    "latest blog website",
    "trending articles",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Topicler | Blogs on Politics, Finance, Real Estate, Technology & More",
    description:
      "Explore expert blogs on Politics, Finance, Real Estate, Technology, Plumbing, Digital Marketing, and Home Improvement.",
    url: "https://topickler.netlify.app",
    siteName: "Topicler",
    images: [
      {
        url: "https://topickler.netlify.app/images/ogImage.png",
        width: 1200,
        height: 630,
        alt: "Topicler Blog Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Topicler | Multi-Niche Blog Platform",
    description:
      "Stay updated with blogs on Finance, Tech, Marketing, Plumbing & more.",
    images: ["/images/ogImage.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },

  category: "technology",
};

const Home = () => {
  return (
    <main className="bg-white">
      <HeroSection />
      <FeaturedCategoriesSection />
      <TrendingSection />
      <NewsletterSection />
    </main>
  );
};

export default Home;