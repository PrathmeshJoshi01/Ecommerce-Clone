import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0)
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 underline">Go shopping</Link>
      </div>
    );

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
            <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">Qty: {item.qty}</p>
              <p className="text-gray-800 font-bold">${item.price * item.qty}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ${total}</h2>
        <div className="space-x-4">
          <button
            onClick={clearCart}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
