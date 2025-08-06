const express = require("express");
const { getc, addc, deletec } = require("../Controller/Comment.control");
const router = express.Router();

// ✅ GET: Get all comments for a specific post
router.get("/get", getc);

// ✅ POST: Add a new comment
router.post("/add", addc);

// ✅ DELETE: Delete a comment
router.delete("/delete/:id", deletec);

module.exports = router;
