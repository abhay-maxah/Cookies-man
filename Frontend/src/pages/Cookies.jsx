
import MainNavigation from "../components/MainNavigation";
import Product from "../components/Product";
import Footer from "./Footer";

const Cookies = () => {
 
  return (
    <>
      <section className="w-4/5 mx-auto">
        <MainNavigation />
        <div className="bg-slate-800 mt-24 text-white">Cookies</div>
        <Product/>
      </section>
      <Footer />
    </>
  );
};

export default Cookies;
