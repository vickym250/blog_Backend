const express = require("express");
const { vistoradd, vistorget } = require("../Controller/visitor.control");
const router = express.Router();

// ✅ POST: Track a new visitor
router.post("/add", vistoradd);

// ✅ GET: Get total visitors count
router.get("/get",vistorget);

module.exports = router;
