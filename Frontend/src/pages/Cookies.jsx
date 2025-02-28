import { useParams } from "react-router-dom";
import Product from "../components/Product";
import Footer from "./Footer";

const Cookies = () => {
  const {productId}= useParams();
  console.log(productId)
  return (                                      
    <>
      <section className="w-full">
        <div className=" text-gray-800">Cookies</div>
        <Product productId={productId}/>
      </section>
      <Footer />    
    </>
  );
};

export default Cookies;
