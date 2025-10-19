import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
  const payload = userId;
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    
    // Validate password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    
    const token = generateToken(user._id.toString()); // toString() is used to convert ObjectId to string
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Get User Data using Token(JWT)
export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

// API to list owner cars
export const getOwnerCars = async (req, res) => {
    try{
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id });
        res.json({ success: true, cars });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to toggle car availability
export const toggleCarAvailability = async (req, res) => {
    try{
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById(carId);

        // Check if the car belongs to the user
        if(car.owner.toString() !== _id.toString()){
            return res.json({ success: false, message: "Not authorized " });
        }
        car.available = !car.available;
        await car.save();
        res.json({ success: true, message: "Availability toggled" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to delete a car
export const deleteCar = async (req, res) => {
    try{
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById(carId);

        // Check if the car belongs to the user
        if(car.owner.toString() !== _id.toString()){
            return res.json({ success: false, message: "Not authorized " });
        }

        car.owner = null; // Remove owner reference
        car.available = false; // Mark car as unavailable
        await car.remove();
        res.json({ success: true, message: "Car deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

