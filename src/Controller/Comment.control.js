const express = require("express");

const Comment = require("../Modal/Comment");

// ✅ 1. Get Comments for a Post
exports.getc =  async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching comments" });
  }
}
// ✅ 2. Add a Comment
exports.addc= async (req, res) => {
  try {
    const {name,content } = req.body;
    if (!name || !content) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const comment = new Comment({  name, content });
    await comment.save();
    res.status(201).json({ success: true, comment });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding comment" });
  }
};

exports.deletec= async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting comment" });
  }
};


