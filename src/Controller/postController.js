const Post = require('../Modal/Post');

exports.createPost = async (req, res) => {
  try {
    const image = req.file?.filename;
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: image || null,
      author: req.user.userId,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const fullPosts = posts.map(post => ({
    ...post._doc,
    imageUrl: post.image ? `${req.protocol}://${req.get('host')}/uploads/${post.image}` : null,
  }));
  res.json(fullPosts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

exports.updatePost = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      content: req.body.content,
    };
    if (req.file) {
      updatedData.image = req.file.filename;
    }
    const post = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
};
