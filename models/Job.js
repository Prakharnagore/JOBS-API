const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: ["true", "Please Provide Company Name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: ["true", "Please Provide Company Name"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId, // connect it to User Schema user
      ref: "User", // ref it to User Schema
      required: [true, "Please Provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
