const employeeModel = require("../model/employeeModel");
exports.createEmployee = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await employeeModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error.message });
  }
};

exports.departmentSalaryExpense = async (req, res) => {
  try {
    let groupStage = {
      $group: {
        _id: "$department",
        totalSalary: { $sum: "$salary" },
      },
    };
    let result = await employeeModel.aggregate([groupStage]);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error.message });
  }
};
