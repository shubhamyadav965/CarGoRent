import imagekit from "../configs/imageKit.js";
import fs from "fs";
import User from "../models/User.js";
import Car from "../models/Car.js";
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
