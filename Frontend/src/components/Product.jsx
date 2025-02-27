import { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`http://localhost:3000/coockies/products?productId=${1}`);
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
  }, []);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="max-w-sm rounded-2xl shadow-lg p-4 bg-white dark:bg-gray-800">
          {product.Image.length > 0 && (
            <img 
              src={`http://localhost:3000/${product.Image[0].image}`} 
              alt={product.name} 
              className="w-full h-40 object-cover rounded-2xl mb-4" 
            />
          )}
          <h2 className="text-xl font-semibold text-center mb-2">{product.name}</h2>
          <div className="text-center text-gray-500 dark:text-gray-400">
            {product.cookiesP.map((cookie) => (
              <p key={cookie.id}>{cookie.Weight} - ₹{cookie.Price}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}