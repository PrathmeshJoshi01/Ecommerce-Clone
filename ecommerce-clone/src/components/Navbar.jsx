import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          MyShop
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/cart" className="hover:text-gray-200 transition">
            Cart 
            <span className="ml-1 bg-white text-blue-600 px-2 py-0.5 rounded text-sm font-semibold">
              {cart.length}
            </span>
          </Link>
          <Link to="/checkout" className="hover:text-gray-200 transition">Checkout</Link>

          {/* Auth Links */}
          {user ? (
            <>
              <span className="font-semibold">Hi, {user.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/signup" className="hover:text-gray-200">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
