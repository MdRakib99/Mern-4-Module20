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
  highestQuantity,
} = require("../controllers/salesControllers");
const {
  createEmployee,
  departmentSalaryExpense,
} = require("../controllers/employeeController");

const router = express.Router();
//Sales
router.post("/createSales", saveSales);
router.get("/total-revenue", totalRevenue);
router.get("/total-quantity", totalquantity);
router.get("/quantity-by-product/:productName", quantityByProduct);

router.get("/top-products", topProducts);
router.get("/average-price", averagePrice);
router.get("/revenue-by-month", revenueByMonth);
router.get("/highest-quantity-sold", highestQuantity);

//Department
router.post("/createEmployee", createEmployee);
router.get("/department-salary-expense", departmentSalaryExpense);

module.exports = router;
