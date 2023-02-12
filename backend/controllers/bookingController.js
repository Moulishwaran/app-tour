import Booking from "../models/Booking.js";

// create New Booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedbooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your Tour is Booked",
      data: savedbooking,
    });
  } catch (error) {
    res.status(500).json({ success: true, message: "internal server error" });
  }
};

// get single Booking
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: book,
    });
  } catch (err) {
    res.status(404).json({ success: true, message: "Not found" });
  }
};
// get All Booking

export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();

    res.status(200).json({
      success: true,
      message: "Successful",
      data: books,
    });
  } catch (err) {
    res.status(500).json({ success: true, message: "internal server error" });
  }
};
