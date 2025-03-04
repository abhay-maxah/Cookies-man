import { useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import { getUserId } from "../util/auth";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = getUserId();
      if (!userId) {
        console.log("User not logged in");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/getItem/${userId}`);
        if (response.status === 200) {
          const products = response.data.products || [];
          console.log(products);
          setCartItems(products);
          calculateSubtotal(products);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.quantity * item.selectedPrice, 0);
    setSubtotal(total);
  };

  const updateQuantity = async (itemId, quantity) => {
    setUpdating(true); // Set loading state when updating quantity
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
    );
    const updatedItem = updatedItems.find((item) => item.id === itemId);

    if (updatedItem.quantity < 1) {
      try {
        await axios.delete(`http://localhost:3000/removeItem/${itemId}`);
        const filteredItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(filteredItems);
        calculateSubtotal(filteredItems);
      } catch (error) {
        console.error("Failed to remove item:", error);
      } finally {
        setUpdating(false);
      }
    } else {
      setCartItems(updatedItems);
      calculateSubtotal(updatedItems);
      try {
        await axios.patch(`http://localhost:3000/update/${itemId}`, {
          quantity: updatedItem.quantity,
        });
      } catch (error) {
        console.error("Failed to update item quantity:", error);
      } finally {
        setUpdating(false); // Reset loading state
      }
    }
  };

  if (loading) {
    return <div className="text-center my-10">Loading...</div>;
  }

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="text-center text-lg font-semibold my-10">
          Your cart is empty
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 my-2 flex items-center justify-between">
              <div>
                <h3>{item.product.name}</h3>
                <p>Size: {item.selectedWeight}</p>
                <p>Price: Rs. {item.selectedPrice}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className={`border px-2 ${updating ? "opacity-50 cursor-wait" : ""}`}
                    disabled={updating}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className={`border px-2 ${updating ? "opacity-50 cursor-wait" : ""}`}
                    disabled={updating}
                  >
                    +
                  </button>
                </div>
              </div>
              <img
                src={`http://localhost:3000/${item.product.Image[0]?.image}`}
                alt={item.product.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          ))}
          <div className="text-right font-semibold text-lg my-4">
            Subtotal: MRP: Rs. {subtotal}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
