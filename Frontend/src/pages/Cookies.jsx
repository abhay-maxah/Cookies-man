import { useParams } from "react-router-dom";
import Product from "../components/Product";
import Footer from "./Footer";

const Cookies = () => {
  const { productId } = useParams();
  console.log(productId);

  return (
    <>
      <section className="w-full min-h-screen p-6">
        <div className="text-3xl font-bold text-center text-brown-700 mb-6">
          🍪 Cookies 🍪
        </div>
        <div>
          <Product productId={productId} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cookies;
