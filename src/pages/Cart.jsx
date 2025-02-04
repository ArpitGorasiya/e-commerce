import { useContext, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { useCartWishlist } from "../context/CartContext";
import cartImage from "../Images/empty-bag.webp";
import { BsPlus } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { BiMinus } from "react-icons/bi";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, addToWishlist } = useCartWishlist();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const price = cart.reduce((acc, item) => acc + item.price * 84, 0);
    setTotalPrice(price);
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    handleRemoveFromCart(item.id);
  };

  return (
    <>
      {cart?.length > 0 ? (
        <>
          <section className="bg-white pt-4 pb-8 antialiased dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Shopping Cart
              </h2>

              <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <a className="shrink-0 md:order-1">
                            <img
                              className="h-20 w-20 dark:hidden"
                              src={item.image}
                            />
                          </a>

                          <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                              <button className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <BsPlus />
                              </button>
                              <span className="px-3">2</span>
                              <button className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <BiMinus />
                              </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                              <p className="text-base font-bold text-gray-900 dark:text-white">
                                ₹{(item.price * 84).toFixed()}
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
                              >
                                Move to Wishlist
                              </button>

                              <button
                                type="button"
                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                              >
                                <svg
                                  className="me-1.5 h-5 w-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                  />
                                </svg>
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
                  <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      Order summary
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Original price
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            $7,592.00
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Savings
                          </dt>
                          <dd className="text-base font-medium text-green-600">
                            -$299.00
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Store Pickup
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            $99
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Tax
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            $799
                          </dd>
                        </dl>
                      </div>

                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                          Total
                        </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                          $8,191.00
                        </dd>
                      </dl>
                    </div>

                    <button className="flex w-full items-center justify-center rounded-lg bg-blue-400 text-white px-5 py-2.5">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
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
