import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from 'framer-motion';

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-role');
      if(data.success){
        setIsOwner(true);
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={` flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
        location.pathname === "/" ? "bg-light" : "bg-white"
      }`}
    >
      <Link to="/" className="flex items-center">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt="Logo"
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
            onClick={() => isOwner ? navigate("/owner") : changeRole()}
            className="cursor-pointer font-medium text-gray-700 hover:text-primary transition-colors"
          >
            {isOwner ? "Dashboard" : "List Cars"}
          </button>
          <button
            onClick={() => {user ? logout() : setShowLogin(true)}}
            className="cursor-pointer px-8 py-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-dull transition-all text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 font-medium"
          >
            {user ? "Logout" : "Login"}
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
    </motion.div>
  );
};

export default Navbar;
