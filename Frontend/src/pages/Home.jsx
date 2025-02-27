
import HeroCard from "../components/HeroCard";
import MainNavigation from "../components/MainNavigation";
import Subscribe from "../Section/Subscribe";
import Footer from "./Footer";

function Home(){
  return (
    <section>
      <MainNavigation />
      <HeroCard/>
      <Subscribe> </Subscribe>
      <Footer/>
      </section>
      );
}
export default Home;