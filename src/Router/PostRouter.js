const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../Controller/postController');

const auth = require('../Middleware/authMiddleware');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Ensure 'uploads' folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // extension like .jpg
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage }).single("image");

// ✅ Routes
router.post('/get', getAllPosts);
router.post('/get/:id', getPostById);
router.post('/add', auth, upload, createPost);
router.put('/:id', auth, updatePost);
router.delete('/delete/:id', auth, deletePost);

module.exports = router;
