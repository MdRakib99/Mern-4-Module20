const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestapms: true, versionKey: false }
);
const salesModel = mongoose.model("sales", dataSchema);
module.exports = salesModel;
