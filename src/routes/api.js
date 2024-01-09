const express = require("express");
const {
  saveSales,
  totalRevenue,
  totalquantity,
  quantityByProduct,
  sortByRevenue,
  topProducts,
  averagePrice,
  revenueByMonth,
} = require("../controllers/salesControllers");

const router = express.Router();

router.post("/createSales", saveSales);
router.get("/total-revenue", totalRevenue);
router.get("/total-quantity", totalquantity);
router.get("/quantityByProduct/:productName", quantityByProduct);
router.get("/sortByRevenue", sortByRevenue);
router.get("/topProducts", topProducts);
router.get("/avgPrice", averagePrice);
router.get("/revenueByMonth", revenueByMonth);

module.exports = router;
