import { useState } from "react";
import { motion } from "framer-motion";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import cartImage from "../Images/empty-bag.webp";
import { useCartWishlist } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, addToWishlist, updateCartQuantity, clearCart } =
    useCartWishlist();

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const moveToWishlist = (product) => {
    removeFromCart(product.id);
    addToWishlist(product);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedProduct = cart.find((item) => item.id === productId);
    updateCartQuantity(productId, updatedProduct.quantity + 1);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedProduct = cart.find((item) => item.id === productId);
    if (updatedProduct.quantity > 1) {
      updateCartQuantity(productId, updatedProduct.quantity - 1);
    }
  };

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 1;
    return total + price * quantity;
  }, 0);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {orderPlaced ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-28 text-center"
        >
          <h3 className="text-green-600 text-3xl font-semibold">
            Order Placed Successfully!
          </h3>
          <p>Your order is being processed. Thank you for shopping with us!</p>
          <NavLink to="/" className="mt-8 inline-block">
            <button className="border border-green-500 rounded-md px-5 py-3">
              Go to Home
            </button>
          </NavLink>
        </motion.div>
      ) : cart?.length > 0 ? (
        <section className="bg-white pt-4 pb-8 antialiased">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Shopping Cart
            </h2>

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                      key={item.id}
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <img className="h-20 w-20" src={item.image} alt="img" />
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                              onClick={() => handleIncreaseQuantity(item.id)}
                            >
                              <BsPlus />
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                              onClick={() => handleDecreaseQuantity(item.id)}
                            >
                              <BiMinus />
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900">
                              ₹{(item.price * item.quantity).toFixed()}
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <h1 className="text-base font-medium text-gray-900">
                            {item.title}
                          </h1>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                              onClick={() => moveToWishlist(item)}
                            >
                              Move to Wishlist
                            </button>

                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                  <p className="text-xl font-semibold text-gray-900">
                    Order summary
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          Original price
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                          ₹{totalPrice.toFixed()}
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          Store Pickup
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          FREE
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                          Tax
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          ₹0
                        </dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                      <dt className="text-base font-bold text-gray-900">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900">
                        ₹{totalPrice.toFixed()}
                      </dd>
                    </dl>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="flex w-full items-center justify-center rounded-lg bg-blue-400 text-white px-5 py-2.5"
                  >
                    {loading ? "Processing..." : "Proceed to Checkout"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="mt-28 text-center">
          <div className="flex justify-center items-center">
            <img src={cartImage} alt="cartImage" />
          </div>
          <h3 className="text-black">Hey, it feels so light!</h3>
          <p>There is nothing in your bag. Let's add some items.</p>
          <NavLink to="/wishlist" className="mt-8 inline-block">
            <button className="border border-rose-500 rounded-md px-5 py-3">
              ADD ITEMS FROM WISHLIST
            </button>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Cart;
