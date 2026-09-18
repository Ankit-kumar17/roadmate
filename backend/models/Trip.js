const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    startingPoint: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;