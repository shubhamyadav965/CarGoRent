import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Function to check availability of car for given dates
export const isCarAvailable = async (carId, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car: carId,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });
  return bookings.length === 0;
};

// API to check the availability of a car for given dates and location
export const checkCarAvailability = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    // fetch cars based on location
    const cars = await Car.find({ location, isAvailable: true });
    // check car availability for given dates
    const availableCarsPromises = cars.map(async (car) => {
      const available = await isCarAvailable(car._id, pickupDate, returnDate);
      return available ? car : null;
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car !== null);

    res.json({ success: true, cars: availableCars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// APi to book a car
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;
    const isAvailability = await isCarAvailable(car, pickupDate, returnDate);
    if (!isAvailability) {
      return res.json({
        success: false,
        message: "Car not available for selected dates",
      });
    }
    const carData = await Car.findById(car);

    // Calculate total amount
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24)) + 1;
    const totalAmount = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      totalAmount,
    });
    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to list user bookings
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to get owner bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "Not authorized" });
    }
    const { _id } = req.user;
    const bookings = await Booking.find({ owner: _id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Not authorized" });
    }
    booking.status = status;
    await booking.save();
    res.json({ success: true, message: "Booking status updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
