import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/products";
import { useCart } from "../contexts/CartContext";
import { FaHeart, FaStar } from "react-icons/fa";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [isFav, setIsFav] = useState(false);

  const { addToCart, removeFromCart, cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id).then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h2 className="p-6">Loading...</h2>;

  // check item
  const cartItem = cart.find((item) => item.id === product.id);
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back to Home */}
      <Link
        to="/"
        className="flex items-center text-blue-600 font-semibold mb-6 hover:underline"
      >
        ⬅ Back to Home
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-1 relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          {/* Favourite Heart */}
          <FaHeart
            size={28}
            className={`absolute top-4 right-4 cursor-pointer transition ${
              isFav ? "text-pink-500" : "text-gray-300"
            }`}
            onClick={() => setIsFav(!isFav)}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2 text-lg">${product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* ⭐ Rating */}
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < (product.rating || 3) ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
          </div>

          {/* Size Selector for Clothes */}
          {product.category?.name === "Clothes" && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Choose Size:</h3>
              <div className="flex gap-2">
                {["S", "M", "L", "XL", "2XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Counter */}
          <div className="mt-6">
            {qty === 0 ? (
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="font-semibold">{qty}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/* Buy Now */}
          <button
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
