const Comment = require("../models/comment.model");

const getCommentByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    // Validate productId
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const comments = await Comment.find({ product: productId }).populate(
      "user",
      "name email"
    ); // Optional: populate user details
    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this product." });
    }

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve comments.", error: error.message });
  }
};

const createComment = async (req, res) => {
  const { product, text } = req.body;
  const userId = req.user._id;

  try {
    // Validate required fields
    if (!product || !text) {
      return res
        .status(400)
        .json({ message: "Product and comment text are required." });
    }

    const newComment = await Comment.create({
      user: userId,
      product,
      text,
    });

    res
      .status(201)
      .json({ message: "Comment added successfully.", comment: newComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create comment.", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    // Validate commentId
    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required." });
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json({
      message: "Comment deleted successfully.",
      comment: deletedComment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete comment.", error: error.message });
  }
};

const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    // Validate required fields
    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required." });
    }
    if (!text) {
      return res.status(400).json({ message: "Updated text is required." });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json({
      message: "Comment updated successfully.",
      comment: updatedComment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update comment.", error: error.message });
  }
};

module.exports = {
  getCommentByProductId,
  createComment,
  deleteComment,
  updateComment,
};
