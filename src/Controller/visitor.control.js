const express = require("express");

const Visitor = require("../Modal/Visitor");

 exports.vistoradd = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    await Visitor.create({ ip });
    res.status(200).json({ success: true, message: "Visitor tracked" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error tracking visitor" });
  }
};

exports.vistorget =  async (req, res) => {
  try {
    const total = await Visitor.countDocuments();
    res.status(200).json({ success: true, total });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching total visitors" });
  }
};


