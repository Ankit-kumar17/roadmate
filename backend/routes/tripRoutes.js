const express = require("express");
const router = express.Router();

const Trip = require("../models/Trip");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      startingPoint,
      destination,
      startDate,
      endDate,
    } = req.body;

    const trip = await Trip.create({
      name,
      startingPoint,
      destination,
      startDate,
      endDate,
      userId: req.user.userId,
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    console.log("CREATE TRIP ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;