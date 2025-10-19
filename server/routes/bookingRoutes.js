import express from "express";
import {
  checkCarAvailability,
  createBooking,
  getOwnerBookings,
  getUserBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", protect, checkCarAvailability);
bookingRouter.post("/create-booking", protect, createBooking);
bookingRouter.get("/user-bookings", protect, getUserBookings);
bookingRouter.get("/owner-bookings", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, updateBookingStatus);

export default bookingRouter;
