import HeroCard from "../components/HeroCard";
import Subscribe from "../Section/Subscribe";
import Footer from "./Footer";

import HowToSection from "../components/HowToSection";
import WhyChooseUs from "../components/WhyChooseUs";
function Home() {
 
  return (
    <section>
      <HeroCard />
      <HowToSection/>
      <WhyChooseUs/>
      <Subscribe />
      <Footer />
    </section>
  );
}

export default Home;
