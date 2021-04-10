import Post from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await Post.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({
      message: ` Post cannot be created. ${error.message}`,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndRemove(id);
    res.status(201).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.userId) {
      return res.json({ messege: Unauthenticated });
    }
    const post = await Post.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
