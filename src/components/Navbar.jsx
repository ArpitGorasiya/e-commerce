import React from "react";
import { CiHeart } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useCartWishlist } from "../context/CartContext";

const Navbar = () => {
  const { cart, wishlist } = useCartWishlist();

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4 py-3">
        <div>
          <NavLink to="/">E-Commerce</NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <NavLink to="/wishlist" className="flex items-center">
              <CiHeart className="text-xl text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 -mt-1 -mr-2">
                  {wishlist.length}
                </span>
              )}
            </NavLink>
          </div>
          <div className="relative">
            <NavLink to="/cart" className="flex items-center">
              <BsFillCartPlusFill className="text-xl text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 -mt-1 -mr-2">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
