import { useState } from "react";
import { FaTshirt, FaShoePrints, FaGem, FaFlask, FaGlasses, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

function CategorySidebar() {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (cat) => {
    setOpenCategory(openCategory === cat ? null : cat);
  };

  return (
    <div className="w-64 bg-white shadow p-4 rounded">
      <h2 className="text-lg font-bold mb-4">CATEGORY</h2>
      <ul className="space-y-4 text-gray-700 font-medium">
        <li>
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleCategory("clothes")}>
            <span className="flex items-center gap-2"><FaTshirt /> Clothes</span>
            <span>{openCategory === "clothes" ? "-" : "+"}</span>
          </div>
          {openCategory === "clothes" && (
            <ul className="ml-6 mt-2 text-sm text-gray-500">
              <li><Link to="/category/clothes/men">Men</Link></li>
              <li><Link to="/category/clothes/women">Women</Link></li>
            </ul>
          )}
        </li>

        <li>
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleCategory("footwear")}>
            <span className="flex items-center gap-2"><FaShoePrints /> Footwear</span>
            <span>{openCategory === "footwear" ? "-" : "+"}</span>
          </div>
          {openCategory === "footwear" && (
            <ul className="ml-6 mt-2 text-sm text-gray-500">
              <li><Link to="/category/footwear/sneakers">Sneakers</Link></li>
              <li><Link to="/category/footwear/sandals">Sandals</Link></li>
            </ul>
          )}
        </li>

        {/* Add more categories */}
      </ul>
    </div>
  );
}

export default CategorySidebar;
