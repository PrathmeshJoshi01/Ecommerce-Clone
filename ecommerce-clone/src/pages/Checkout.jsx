import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0)
    return <h2 className="p-6 text-center text-xl">Your cart is empty</h2>;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleOrder = () => {
    alert("✅ Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.title} (x{item.qty})</span>
            <span>${item.price * item.qty}</span>
          </div>
        ))}

        <div className="flex justify-between border-t pt-4 font-bold text-lg">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <button
          onClick={handleOrder}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
