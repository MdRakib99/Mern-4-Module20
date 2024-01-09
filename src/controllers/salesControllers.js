const salesModel = require("../model/salesModel");

exports.saveSales = async (req, res) => {
  let reqBody = req.body;
  try {
    let data = await salesModel.create(reqBody);
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};

exports.totalRevenue = async (req, res) => {
  try {
    let data = await salesModel.find();
    let totalAmount = 0;
    data.forEach((element) => {
      let price = parseFloat(element["price"]);
      let quantity = parseFloat(element["quantity"]);
      totalAmount += parseFloat(quantity * price);
    });
    res.status(200).json({ status: "success", data: totalAmount });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};
exports.totalquantity = async (req, res) => {
  try {
    let data = await salesModel.find();
    let totalQuantity = 0;
    data.forEach((element) => {
      let quantity = parseFloat(element["quantity"]);
      totalQuantity += quantity;
    });
    res.status(200).json({ status: "success", data: totalQuantity });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};
exports.quantityByProduct = async (req, res) => {
  try {
    let productName = req.params.productName;
    let data = await salesModel.aggregate([
      {
        $match: {
          product: productName,
        },
      },
    ]);
    mainquantity = 0;
    data.forEach((element) => {
      let quantity = parseFloat(element["quantity"]);
      mainquantity += quantity;
    });

    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};

exports.sortByRevenue = async (req, res) => {
  try {
    const result = await salesModel.aggregate([
      {
        $group: {
          _id: "$product",
          sum: { $sum: "$price" },
        },
      },
    ]);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};

exports.topProducts = async (req, res) => {
  try {
    const result = await salesModel.aggregate([
      {
        $group: {
          _id: "$product",
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};

exports.averagePrice = async (req, res) => {
  try {
    let result = await salesModel.aggregate([
      {
        $group: {
          _id: null,
          totalAverage: { $avg: "$price" },
        },
      },
    ]);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};
exports.revenueByMonth = async (req, res) => {
  try {
    // Projection stage: Extract year and month from the date field
    let projectionStage = {
      $project: {
        year: { $year: "$date" },
        month: { $month: "$date" },
        quantity: 1, // Assuming you have a field named "quantity" in your data model
        price: 1, // Assuming you have a field named "price" in your data model
      },
    };

    // Grouping stage: Group by year and month
    let groupStage = {
      $group: {
        _id: {
          year: "$year",
          month: "$month",
        },
        revenue: { $sum: { $multiply: ["$quantity", "$price"] } }, // Calculate total revenue
      },
    };

    // Sort stage: Sort by year and month
    let sortStage = {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    };

    // Execute the aggregation pipeline
    let result = await salesModel.aggregate([
      projectionStage,
      groupStage,
      sortStage,
    ]);

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "fail", data: error.message });
  }
};
