import React from "react";
import Title from "../components/Title";
import { assets, dummyCarData } from "../assets/assets";
import { useState } from "react";
import CarCard from "../components/CarCard";

const Cars = () => {
  const [input, setinput] = useState("");
  return (
    <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
      <Title
        title="Available Cars"
        subTitle="Browse our selection of premium vehicles availbale for your next advanture "
      />

      <div className="flex items-center justify-center w-full max-w-2xl mx-auto">
        <div className="flex items-center bg-white px-4 mt-6 w-full h-12 rounded-full shadow">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4.5 h-4.5 mr-2"
          />
          <input
            onChange={(e) => setinput(e.target.value)}
            type="text"
            value={input}
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-  500"
          />
          <img
            src={assets.filter_icon}
            alt="filter"
            className="w-4.5 h-4.5 ml-2"
          />
        </div>
      </div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {dummyCarData.length} Cars
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 xl:px-20 max-w-7xl mx-auto">
          {dummyCarData.map((car, index) => (
            <div>
              <CarCard key={index} car={car} currency="₹" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;