import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { Spin } from "antd";
import { useCartWishlist } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    addToCart,
    isInCart,
    addToWishlist,
    isInWishlist,
    removeFromWishlist,
  } = useCartWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Spin fullscreen className="h-full flex items-center" />;
  }

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="relative top-2 left-4 flex items-center gap-2 p-2 text-gray-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none"
      >
        <FaArrowLeft /> Back
      </button>
      <section className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img className="w-full" src={product.image} alt={product.title} />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {product.title}
            </h1>
            <p className="mt-6 mb-6 text-gray-500">{product.description}</p>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                ₹{(product.price * 84).toFixed()}
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <AiFillStar
                      key={index}
                      className={`w-4 h-4 ${
                        index < product.rating?.rate
                          ? "text-yellow-300"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium leading-none text-gray-500">
                  ({product.rating?.rate})
                </p>
              </div>
            </div>

            <div className="mt-6 gap-4 items-center flex">
              {!isInCart(product.id) ? (
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                >
                  <BsFillCartPlusFill className="w-5 h-5 -ms-2 me-2" />
                  Add to Cart
                </button>
              ) : (
                <button
                  onClick={() => navigate("/cart")}
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                >
                  Go to Cart
                </button>
              )}

              <button
                onClick={() =>
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
                className="flex items-center justify-center py-2 px-2.5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                <CiHeart
                  fillColor="red"
                  className="text-2xl text-gray-700"
                  style={{
                    color: isInWishlist(product.id) ? "red" : "gray",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
