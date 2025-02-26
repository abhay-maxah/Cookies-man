import MainNavigation from "../components/MainNavigation";
import Product from "../components/Product";

const Chocolates = () => {
  return (
    <section>
      <MainNavigation />
      <div className="bg-slate-800 mt-24 text-white">Chocolates</div>
      <Product/>
    </section>
  )
}

export default Chocolates