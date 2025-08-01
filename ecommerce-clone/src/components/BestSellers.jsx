import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function BestSellers({ products }) {
  // lowest prize product
  const bestDeals = products
    .filter((p) => p.price < 50)
    .slice(0, 4);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">⭐ Best Sellers</h2>
      <div className="grid grid-cols-2 gap-4">
        {bestDeals.map((p) => (
          <Link
            to={`/product/${p.id}`}
            key={p.id}
            className="bg-white p-3 rounded shadow hover:shadow-lg transition transform hover:scale-105"
          >
            <img
              src={p.images[0]}
              alt={p.title}
              className="h-24 w-full object-cover rounded"
            />
            <h3 className="mt-2 text-sm font-semibold">{p.title}</h3>
            <p className="text-green-600">${p.price}</p>

            {/* rating */}
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < (p.rating || 3)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                  size={12}
                />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
