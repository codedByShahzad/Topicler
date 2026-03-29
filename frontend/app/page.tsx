import CategorySections from "@/src/sections/CategorySections";
import HeroSection from "../src/sections/HeroSection";
import FeaturedCategoriesSection from "@/src/sections/FeaturedCategoriesSection";

const Home = () => {
  return (
    <main className="bg-white">
      <HeroSection />
      <FeaturedCategoriesSection />
    </main>
  );
};

export default Home;