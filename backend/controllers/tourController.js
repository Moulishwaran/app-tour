import Tour from "../models/Tour.js";

// create new Tour

export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: "Successfully Created",
      data: savedTour,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

// update tour

export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfylly updated",
      data: updateTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to updated",
    });
  }
};

// delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfylly deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

// getSingle Tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfyll",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

// get All Tour

export const getAllTour = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

// get tour by search

export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i"); // here 'i' means case  sensitive
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    // gte means grater then equal
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({ success: true, message: "Successful", data: tours });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

// get featured tour

export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);
    res.status(200).json({
      success: true,
      message: "Successfull",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

//get tour counts
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({ Success: true, data: tourCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};
