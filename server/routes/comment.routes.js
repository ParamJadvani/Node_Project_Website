const {
  getCommentByProductId,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const { verifyToken } = require("../middlewares/JWT_AUTH");

const commentRouter = require("express").Router();

commentRouter.get("/:productId", getCommentByProductId);

commentRouter.post("/", verifyToken, createComment);

commentRouter.patch("/", verifyToken, updateComment);

commentRouter.delete("/", verifyToken, deleteComment);
