import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/car-go-rent`);
  } catch (error) {
    console.log(error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
