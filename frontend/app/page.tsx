import CategorySections from "@/src/sections/CategorySections";
import HeroSection from "../src/sections/HeroSection";
import FeaturedCategoriesSection from "@/src/sections/FeaturedCategoriesSection";
import TrendingSection from "@/src/sections/TrendingSection";
import NewsletterSection from "@/src/sections/NewsletterSection";

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