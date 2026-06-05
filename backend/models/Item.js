const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
{
   title: {
      type: String,
      required: true
   },

   description: {
      type: String,
      required: true
   },

   condition: {
      type: String,
      enum: ["Excellent", "Good", "Average", "Poor"],
      required: true
   },

   type: {
      type: String,
      enum: ["sell", "lend"],
      required: true
   },

   price: {
      type: Number
   },

   status: {
      type: String,
      enum: ["available", "reserved", "sold"],
      default: "available"
   },

   owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
   }
},
{
   timestamps: true
}
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;