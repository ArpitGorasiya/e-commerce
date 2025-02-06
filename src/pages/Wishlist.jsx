import { NavLink } from "react-router-dom";
import { useCartWishlist } from "../context/CartContext";

const Wishlist = () => {
  const { wishlist, addToCart } = useCartWishlist();

  return (
    <>
      {wishlist.length ? (
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
            {wishlist?.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg overflow-hidden relative"
              >
                <img
                  src={product.image}
                  alt={product.title}
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
                      ₹{(product.price).toFixed() || "N/A"}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="text-black border w-full px-4 py-2 rounded-lg"
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-28 text-center">
          <h3 className="text-black">Hey, it feels so light!</h3>
          <p>There is nothing in your wishlist. Let's add some items.</p>
          <NavLink to="/" className="mt-8 inline-block">
            <button className="border border-rose-500 rounded-md px-5 py-3">
              Continue Shopping
            </button>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Wishlist;
