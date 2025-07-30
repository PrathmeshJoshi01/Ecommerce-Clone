import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
    });
  }, []);

  // filter products whenever filters change
  useEffect(() => {
    let result = products;

    // search
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // category filter
    if (category !== "all") {
      result = result.filter((p) => p.category?.name === category);
    }

    // price filter
    if (priceRange !== "all") {
      if (priceRange === "low") {
        result = result.filter((p) => p.price < 50);
      } else if (priceRange === "mid") {
        result = result.filter((p) => p.price >= 50 && p.price <= 200);
      } else if (priceRange === "high") {
        result = result.filter((p) => p.price > 200);
      }
    }

    setFiltered(result);
  }, [search, category, priceRange, products]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
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
        <h2 className="text-4xl font-bold mb-4">Welcome to MyShop 🛍️</h2>
          <p className="text-lg">
            Discover amazing products at the best prices. Sign up and start shopping today!
          </p>
        <button className="mt-6 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200">
          Shop Now
        </button>
      </div>
  
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.map((product) => (
          <div
           key={product.id}
           className="bg-white rounded-lg shadow hover:shadow-xl hover:scale-105 transform transition p-4 flex flex-col"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-3 text-lg font-semibold">{product.title}</h3>
            </Link>
            <p className="text-gray-600 mt-1">${product.price}</p>
            <button
              onClick={() => {
                addToCart(product);
                toast.success(`${product.title} added to cart`);
              }}
              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
