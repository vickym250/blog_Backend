const Post = require("../Modal/Post");
const Comment = require("../Modal/Comment");
const Visitor = require("../Modal/Visitor");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const totalComments = await Comment.countDocuments();
    const totalVisitors = await Visitor.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalPosts,
        totalComments,
        totalVisitors
      }
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data"
    });
  }
};
