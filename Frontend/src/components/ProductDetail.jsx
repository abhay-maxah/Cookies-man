import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { getUserId } from '../util/auth';
export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //handle a fetch user id of current login
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:3000/product/${productId}`);
        setProduct(response.data);

        if (response.data.Image?.length > 0) {
          setSelectedImage(`http://localhost:3000/${response.data.Image[0].image}`);
        }
        if (response.data.cookiesP?.length > 0) {
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

  const handleAddToCart = async () => {
    const userId = getUserId();
    if (!userId) {
      alert('Please log in first');
      return;
    }
  
    if (!selectedWeight || !price) {
      alert('Please select a weight before adding to cart');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/addItem', {
        productId: parseInt(productId),
        userId,
        quantity: 1,  // Default quantity
        selectedWeight,
        selectedPrice: price,
      });
  
      if (response.status === 201) {
        alert('Item added to cart successfully!');
      }
      if(response.status===200){
        alert('Item added to cart successfully !');
      }

    } catch (err) {
      console.error('Failed to add item to cart:', err);
      alert('Failed to add item to cart.');
    }
  };
  
  if (loading) return <div className="text-center text-lg mt-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;

  return (
    <div className="my-auto p-10 max-w-6xl mx-auto bg-white bg-opacity-25 shadow-lg rounded-2xl flex backdrop-blur-lg border border-white/20">
      <div className="w-1/4 flex flex-col items-center gap-4">
        {product.Image?.map((img) => (
          <img
            key={img.id}
            src={`http://localhost:3000/${img.image}`}
            alt={product.name}
            className="w-16 h-16 object-cover cursor-pointer border-2 border-transparent hover:border-blue-600 transition rounded-lg"
            onClick={() => setSelectedImage(`http://localhost:3000/${img.image}`)}
          />
        ))}
      </div>
      <div className="w-3/4 p-6">
        {selectedImage && (
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
        )}
        <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
        <div className="flex items-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="text-yellow-500" size={20} />
          ))}
          <span className="text-gray-600">(4.5)</span>
        </div>
        <div className="text-lg mb-4">Net Weights:</div>
        <div className="flex gap-4 mb-4">
          {product.cookiesP?.map((cookie) => (
            <button
              key={cookie.id}
              className={`px-4 py-2 rounded-lg border ${selectedWeight === cookie.Weight ? 'border-blue-600 bg-blue-100' : 'border-gray-300'} hover:bg-blue-200 transition`}
              onClick={() => handleWeightSelect(cookie.Weight, cookie.Price)}
            >
              {cookie.Weight}
            </button>
          ))}
        </div>

        <div className="text-lg font-bold text-black mb-4">MRP: Rs. {price}</div>
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
          <button className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
