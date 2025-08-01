import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import CategorySidebar from "../components/CategorySidebar";
import BestSellers from "../components/BestSellers";

function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [favourites, setFavourites] = useState([]);
  const { addToCart, removeFromCart, cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
    });
  }, []);

  // filter products whenever filters change
  useEffect(() => {
    let result = products;

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category?.name === category);
    }

    if (priceRange !== "all") {
      if (priceRange === "low") result = result.filter((p) => p.price < 50);
      else if (priceRange === "mid") result = result.filter((p) => p.price >= 50 && p.price <= 200);
      else if (priceRange === "high") result = result.filter((p) => p.price > 200);
    }

    setFiltered(result);
  }, [search, category, priceRange, products]);

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex gap-6">
      {/* Sidebar Section */}
      <div className="w-1/4">
        <CategorySidebar />
        <BestSellers products={products} />
      </div>

      {/* Main Content */}
      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-1/3"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Categories</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Shoes">Shoes</option>
            <option value="Others">Others</option>
          </select>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Prices</option>
            <option value="low">Below $50</option>
            <option value="mid">$50 - $200</option>
            <option value="high">Above $200</option>
          </select>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-10 mb-10 shadow-lg">
          <h2 className="text-4xl font-bold mb-4">Welcome to MyShopify 🛍️</h2>
            <p className="text-lg">
              Discover amazing products at the best prices. Sign up and start shopping today!
            </p>
          <button className="mt-6 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200">
            Shop Now
          </button>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            const qty = cartItem ? cartItem.qty : 0;
            const isFav = favourites.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-xl transform transition p-4 relative"
              >
                {/* Favourite Heart */}
                <FaHeart
                  className={`absolute top-3 right-3 cursor-pointer ${
                    isFav ? "text-pink-500" : "text-gray-300"
                  }`}
                  size={20}
                  onClick={() => toggleFavourite(product.id)}
                />

                {/* Product Image & Name */}
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="mt-3 text-lg font-semibold hover:text-blue-600">
                    {product.title}
                  </h3>
                </Link>

                {/* Price */}
                <p className="text-gray-600">${product.price}</p>

                {/* Rating */}
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < (product.rating || 3) // default rating 3
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Add to Cart Counter */}
                {qty === 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-3 flex justify-between items-center bg-gray-100 p-2 rounded">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      +
                    </button>
                  </div>
                )}

                {/* Buy Now */}
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="mt-3 w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-full shadow-lg transform hover:scale-105 transition"
                >
                   Buy Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
