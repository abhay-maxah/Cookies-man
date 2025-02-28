import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:3000/product/${productId}`);
        setProduct(response.data);
        if (response.data.Image && response.data.Image.length > 0) {
          setSelectedImage(`http://localhost:3000/${response.data.Image[0].image}`);
        }
        if (response.data.cookiesP && response.data.cookiesP.length > 0) {
          setSelectedWeight(response.data.cookiesP[0].Weight);
          setPrice(response.data.cookiesP[0].Price);
        }
      } catch (err) {
        setError('Failed to fetch product details',err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleWeightSelect = (weight, price) => {
    setSelectedWeight(weight);
    setPrice(price);
  };

  if (loading) return <div className="text-center text-lg mt-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;

  return (
    <>
    <div style={{
            background: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(7px)",
            WebkitBackdropFilter: "blur(7px)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.18)"
          }} className="my-auto p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl flex">
      <div className="w-1/4 flex flex-col items-center gap-4">
        {product.Image && product.Image.map((img) => (
          <img 
            key={img.id} 
            src={`http://localhost:3000/${img.image}`} 
            alt={product.name} 
            className="w-16 h-16 object-cover cursor-pointer border-2 border-transparent hover:border-blue-600 transition" 
            onClick={() => setSelectedImage(`http://localhost:3000/${img.image}`)}
          />
        ))}
      </div>
      <div className="w-3/4">
        {selectedImage && (
          <img 
            src={selectedImage} 
            alt={product.name} 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <div className="text-lg text-gray-600 mb-4">Net Weights:</div>
        <div className="flex gap-4 mb-4">
          {product.cookiesP && product.cookiesP.map((cookie) => (
            <button 
              key={cookie.id} 
              className={`px-4 py-2 rounded-lg border ${selectedWeight === cookie.Weight ? 'border-blue-600 bg-blue-100' : 'border-gray-300'} hover:bg-blue-200 transition`} 
              onClick={() => handleWeightSelect(cookie.Weight, cookie.Price)}
            >
              {cookie.Weight}
            </button>
          ))}
        </div>
        <div className="text-lg font-bold text--600 mb-4">MRP: Rs. {price}</div>
        <div className="flex justify-start items-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
          <button className="bg-blue-600 ml-2 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
    <Product/>
    </>
  );
}
