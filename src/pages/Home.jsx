import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartWishlist } from "../context/CartContext";
import { Spin } from "antd";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("none");
  const [loading, setLoading] = useState(true);

  const debounceTimeout = useRef(null);
  const navigate = useNavigate();

  const {
    addToCart,
    addToWishlist,
    isInCart,
    isInWishlist,
    removeFromWishlist,
  } = useCartWishlist();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setLoading(false);
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      filterProducts(query, sortBy);
    }, 500);
  };

  const handleSort = (e) => {
    const sortOption = e.target.value;
    setSortBy(sortOption);
    filterProducts(searchQuery, sortOption);
  };

  const filterProducts = (query, sortOption) => {
    let filtered = [...products];

    if (query) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (sortOption === "ascPrice") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "descPrice") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return <Spin fullscreen className="h-full flex items-center" />;
  }

  return (
    <div className="p-5">
      <input
        type="text"
        className="p-2 border border-gray-300 rounded mb-4 w-80"
        placeholder="Search by name or category"
        value={searchQuery}
        onChange={handleSearch}
      />

      <select
        className="p-2 border border-gray-300 rounded mb-4"
        value={sortBy}
        onChange={handleSort}
      >
        <option value="none">Sort by</option>
        <option value="ascPrice">Price Low to High</option>
        <option value="descPrice">Price High to Low</option>
        <option value="rating">Rating</option>
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredProducts?.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-lg overflow-hidden relative"
          >
            <button
              className="flex absolute right-2 top-2 z-10"
              onClick={() =>
                isInWishlist(product.id)
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }
            >
              <CiHeart
                fillColor="red"
                className="text-2xl text-gray-700"
                style={{
                  color: isInWishlist(product.id) ? "red" : "gray",
                }}
              />
            </button>

            <img
              src={product.image}
              alt={product.title}
              onClick={() => navigate(`/product/${product.id}`)}
              className="p-4 w-full h-48 object-contain cursor-pointer"
            />

            <div className="p-4">
              <h2
                title={product.title}
                className="text-lg font-semibold text-gray-800 truncate"
              >
                {product.title}
              </h2>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">
                  ₹{(product.price * 84).toFixed() || "N/A"}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                {!isInCart(product.id) ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="text-black border w-full px-4 py-2 rounded-lg"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/cart")}
                    className="text-black border w-full px-4 py-2 rounded-lg"
                  >
                    Go to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
