const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user.userId,
      image: req.body.image || null

    });

    const saved = await post.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Post creation failed", error });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    const updated = await post.save();

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error });
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
