import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={` flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
        location.pathname === "/" ? "bg-light" : "bg-white"
      }`}
    >
      <Link to="/" className="flex items-center">
        <img
          src={assets.logo}
          alt="CarGoRent Logo"
          className="h-28 md:h-40 w-auto object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-backgroundColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
          location.pathname === "/" ? "bg-light" : "bg-white"
        } ${open ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`font-medium transition-colors hover:text-primary ${
              location.pathname === link.path ? "text-primary" : "text-gray-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
        <div className="hidden lg:flex item-center text-sm gap-2 border border-gray-200 rounded-full px-3 max-w-64 focus-within:border-primary transition-colors">
          <input
            type="text"
            name="search"
            id=""
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-400"
            placeholder="Search Cars"
          />
          <img src={assets.search_icon} alt="search" className="opacity-50" />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={() => navigate("/owner")}
            className="cursor-pointer font-medium text-gray-700 hover:text-primary transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="cursor-pointer px-8 py-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-dull transition-all text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 font-medium"
          >
            Login
          </button>
        </div>
      </div>
      <button
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </div>
  );
};

export default Navbar;
