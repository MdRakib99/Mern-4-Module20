const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  { timestapms: true, versionKey: false }
);
const employeeModel = mongoose.model("employees", dataSchema);
module.exports = employeeModel;
