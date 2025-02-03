import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { useState, useEffect } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="p-5">
      <input
        type="text"
        className="p-2 border border-gray-300 rounded mb-4 w-80"
        placeholder="Search by name or category"
        value={searchQuery}
        onChange={handleSearch}
      />

      <select className="p-2 border border-gray-300 rounded mb-4">
        <option value="none">Sort by</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredProducts?.map((v, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden relative"
          >
            <button className="flex absolute right-2 top-2 z-10">
              <CiHeart fillColor="red" className="text-2xl text-gray-700" />
            </button>

            <img
              src={v.image}
              alt={v.title}
              className="w-full h-48 object-contain"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {v.title}
              </h2>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">
                  ₹{(v.price * 84).toFixed() || "N/A"}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <button className="text-black border w-full px-4 py-2 rounded-lg">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
