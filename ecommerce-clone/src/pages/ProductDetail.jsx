import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/products";
import { useCart } from "../contexts/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id).then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h2 className="p-6">Loading...</h2>;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <div className="flex-1">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600 mt-3 text-lg">${product.price}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
