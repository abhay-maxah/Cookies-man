import Product from "../components/Product";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

const Chocolates = () => {
  const {productId}= useParams();
  return (
    <>
      <section className="w-full">
        <div className="bg-slate-800 text-white">Chocolates</div>
        <Product  productId={productId}/>
      </section>
      <Footer />
    </>
  );
};
export default Chocolates