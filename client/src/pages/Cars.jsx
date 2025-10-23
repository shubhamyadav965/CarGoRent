import React, { useEffect } from "react";
import Title from "../components/Title";
import { assets, dummyCarData } from "../assets/assets";
import { useState } from "react";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Cars = () => {
  // getting search params from url
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [input, setinput] = useState("");
  const [loading, setLoading] = useState(false);

  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);

  const applyFilter = async () => {
    if(input === "") {
      setFilteredCars(cars);
      return null;
    }

    const filtered = cars.slice().filter((car) => {
      return car.brand.toLowerCase().includes(input.toLowerCase()) ||
             car.model.toLowerCase().includes(input.toLowerCase()) ||
             car.category.toLowerCase().includes(input.toLowerCase()) ||
             car.transmission.toLowerCase().includes(input.toLowerCase());
    })
    setFilteredCars(filtered);
  }

  const searchCarAvailability = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/bookings/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        setFilteredCars(data.availableCars);
        if(data.availableCars.length === 0){
          toast("No cars available for the selected dates and location");
        }
      } else {
        toast.error(data.message || "Failed to fetch available cars");
      }
    } catch (error) {
      console.error("Error fetching car availability:", error);
      toast.error("Failed to load available cars. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect( () => {
    isSearchData && searchCarAvailability();
  }, [])

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter();
  }, [input, cars]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center py-20 bg-light max-md:px-4">
      <Title
        title="Available Cars"
        subTitle="Browse our selection of premium vehicles available for your next adventure "
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}  
        className="flex items-center justify-center w-full max-w-2xl mx-auto">
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
            className="w-full h-full outline-none text-gray-500"
          />
          <img
            src={assets.filter_icon}
            alt="filter"
            className="w-4.5 h-4.5 ml-2"
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}  
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <img src={assets.car_icon} alt="No cars" className="w-20 h-20 opacity-30 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Cars Available</h3>
            <p className="text-gray-500">
              {input ? "Try adjusting your search filters" : "No cars match your criteria"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 xl:px-20 max-w-7xl mx-auto">
            {filteredCars.map((car, index) => (
              <motion.div key={car._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CarCard car={car} currency="₹" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cars;
