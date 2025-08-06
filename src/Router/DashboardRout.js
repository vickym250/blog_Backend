const express = require("express");
const { getDashboardStats } = require("../Controller/DashBoard.control");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();


router.get("/stats",authMiddleware,getDashboardStats);

module.exports = router;
