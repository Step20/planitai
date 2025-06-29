import HomeFooterSection from "../components/home/HomeFooterSection";
import HomeNewsSection from "../components/home/HomeNewsSection";
import HomePeopleSection from "../components/home/HomePeopleSection";
import HomePlansSection from "../components/home/HomePlansSection";
import HomeRatedSection from "../components/home/HomeRatedSection";
import HomeTopSection from "../components/home/HomeTopSection";

export default function HomePage() {
  return (
    <div>
      <HomeTopSection />
      <HomeRatedSection />
      <HomePlansSection />
      <HomePeopleSection />
      <HomeNewsSection />
      <HomeFooterSection />
    </div>
  );
}
