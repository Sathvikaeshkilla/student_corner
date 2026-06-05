const mongoose = require("mongoose");

const pyqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    subject: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
      enum: [
        "General",
        "CSE",
        "ECE",
        "EEE",
        "MECH",
        "CIVIL",
        "IT",
      ],
    },

    year: {
      type: Number,
      required: true,
    },

    examType: {
      type: String,
      required: true,
      enum: ["Mid", "Minor", "End Sem"],
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PYQ = mongoose.model("PYQ", pyqSchema);

module.exports = PYQ;