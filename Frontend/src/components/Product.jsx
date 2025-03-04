import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, Info } from 'lucide-react';
import PropTypes from "prop-types";

export default function Product({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`http://localhost:3000/products?productId=${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [productId]);

  const handleNavigate = (id) => {
    navigate(`/product/cookies/detail/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-gray-500" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        <AlertCircle size={40} className="mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6 bg-[#FDF6EE]">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          onMouseEnter={() => setHovered(product.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <img
            src={`http://localhost:3000/${hovered === product.id && product.Image[1] ? product.Image[1].image : product.Image[0]?.image}`}
            alt={product.name}
            className="w-full h-64 object-cover bg-gray-200"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#6D4C41] mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>

            {product.cookiesP.length > 0 && (
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-gray-700 font-medium">MRP: Rs</span>
                <span className="bg-[#FFE082] text-[#6D4C41] px-4 py-1 rounded-full font-semibold">
                  ₹{product.cookiesP[0].Price}
                </span>
              </div>
            )}

            <button
              onClick={() => handleNavigate(product.id)}
              className="w-full bg-[#6D4C41] text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-transform transform hover:scale-105 hover:bg-[#5a3a31]"
            >
              Detail
              <Info size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

Product.propTypes = {
  productId: PropTypes.number.isRequired,
};
