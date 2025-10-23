import imagekit from "../configs/imageKit.js";
import fs from "fs";
import User from "../models/User.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import { response } from "express";
import { format } from "path";

//Change Role to Owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Add Car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    // Read uploaded file
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload image
    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // Optimize image URL
    let optimizedImageUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { width: "1280" }, // Resize to width 1280px
        { quality: "auto" }, // Auto compression for quality
        { format: "webp" }, // Convert to modern webp format
      ],
    });

    // Create Car document
    const image = optimizedImageUrl;
    await Car.create({ ...car, owner: _id, image });

    // Remove temp file
    fs.unlinkSync(imageFile.path);

    res.json({ success: true, message: "Car Added Successfully" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to list owner cars
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to toggle car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // Check if the car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Not authorized" });
    }
    car.isAvailable = !car.isAvailable;
    await car.save();
    res.json({ success: true, message: "Availability toggled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to delete a car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // Check if the car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Not authorized" });
    }

    await Car.findByIdAndDelete(carId);
    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to get Dashboard Data
export const getDashboardData = async (req, res) => {
    try{
        const { _id, role } = req.user;
        if(role !== 'owner'){
            return res.json({ success: false, message: "Not authorized" });
        }
        const cars = await Car.find({ owner: _id });
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });    
        const pendingBookings = bookings.filter(booking => booking.status === 'pending');
        const completedBookings = bookings.filter(booking => booking.status === 'confirmed');
        // Calculate total earnings
        const monthlyRevenue = bookings.filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.totalAmount, 0);

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue: monthlyRevenue
        }
        
        res.json({ success: true, dashboardData });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to update image of user
export const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user;
        const fileBuffer = fs.readFileSync(imageFile.path);
        const uploadResponse = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/users",
        });

        let optimizedImageUrl = imagekit.url({
            path: uploadResponse.filePath,
            transformation: [
                { width: "1280" }, // Resize to width 1280px
                { quality: "auto" }, // Auto compression for quality
                { format: "webp" }, // Convert to modern webp format
            ]
        });
        const image = optimizedImageUrl;
        await User.findByIdAndUpdate(_id, { image });
        res.json({ success: true, message: "Image updated successfully", image });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}