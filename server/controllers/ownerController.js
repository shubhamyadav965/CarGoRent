import ImageKit from "imagekit";
import fs from "fs";

import User from "../models/User.js";
// import Car from "../models/Car.js";

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
    const car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    // Read uploaded file
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Initialize ImageKit
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });

    // Upload image
    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars"
    });

    // Optimize image URL
    const optimizedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/tr:w-1280,q-auto,f-webp${uploadResponse.filePath}`;

    // Create Car document
    await Car.create({ ...car, owner: _id, image: optimizedImageUrl });

    // Remove temp file
    fs.unlinkSync(imageFile.path);

    res.json({ success: true, message: "Car Added Successfully" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};