import CategorySections from "@/src/sections/CategorySections";
import HeroSection from "../src/sections/HeroSection";
import PoliticsSection from "@/src/sections/PoliticsSection";
import FinanceSection from "@/src/sections/FinanceSection";
import ScienceSection from "@/src/sections/ScienceSection";
import SportsSection from "@/src/sections/SportsSection";

const Home = () => {
  return (
    <main className="bg-white">
      <HeroSection />
      <PoliticsSection />
      <FinanceSection />
      <ScienceSection />
      <SportsSection />
    </main>
  );
};

export default Home;