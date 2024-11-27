const express = require("express");
const {
  SignUp,
  Login,
  VerifyEmail,
  deleteUser,
  GetUser,
} = require("../controllers/user.controllers");
const upload = require("../middlewares/multer");
const isValidateField = require("../middlewares/isValidateField");

const UserRouter = express.Router();

UserRouter.get("/", GetUser);

UserRouter.post("/signup", isValidateField, upload.single("image"), SignUp);

UserRouter.post("/login", isValidateField, Login);

UserRouter.get("/verify/:token/:otp", VerifyEmail);

UserRouter.delete("/:id", deleteUser);

module.exports = UserRouter;
