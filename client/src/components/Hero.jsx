import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";

const Hero = () => {
  const [pickupLocation, setpickupLocation] = useState("");
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-14 bg-gradient-to-br from-light via-blue-50 to-orange-50 text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Luxury Cars on Rent
      </h1>

      <form className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-2xl shadow-primary/10 border border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:item-start md:items-center gap-10 min-md:ml-8">
          <div className="flex flex-col items-start gap-2">
            <select
              required
              value={pickupLocation}
              onChange={(e) => setpickupLocation(e.target.value)}
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickupLocation ? pickupLocation : "Please Select Location"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              className="text-sm text-gray-500"
              required
            />
          </div>
        </div>
        <button className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer">
          <img
            src={assets.search_icon}
            alt="Search"
            className="brightness-300"
          />
          Search
        </button>
      </form>

      <img src={assets.main_car} alt="Car" className="max-h-74" />
    </div>
  );
};

export default Hero;
