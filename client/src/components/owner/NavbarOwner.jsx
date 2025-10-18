import React from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { Link } from "react-router-dom";

const NavbarOwner = () => {
  const user = dummyUserData;
  return (
    <div className="flex item-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
      <Link to="/" className="flex items-center">
        <img
          src={assets.logo}
          alt="CarGoRent Logo"
          className="h-24 md:h-32 w-auto object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </Link>
      <p>Welcome, {user.name || "Owner"} </p>
    </div>
  );
};

export default NavbarOwner;
