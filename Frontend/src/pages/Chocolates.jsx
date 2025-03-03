import Product from "../components/Product";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

const Chocolates = () => {
  const {productId}= useParams();
  return (
    <>
       <section className="w-full min-h-screen p-6">
             <div className="text-3xl font-bold text-center text-brown-700 mb-6">
               🍪 Chocolate 🍪
             </div>
             <div>
               <Product productId={productId} />
             </div>
           </section>
      <Footer />
    </>
  );
};
export default Chocolates