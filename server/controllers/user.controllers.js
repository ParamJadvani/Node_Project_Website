const bcrypt = require("bcrypt");
const { GenerateToken } = require("../middlewares/JWT_AUTH");
const User = require("../models/user.model");
const sendMailVerification = require("../service/sendMail");
const { generateOTP, composeVerificationEmail } = require("../helper/helper");
const JWT = require("jsonwebtoken");

const otps = new Map();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

// Get Users (All Users or Filtered by Role)
const GetUsers = async (req, res) => {
  const { role } = req.query;
  const filter = role ? { role } : {};

  try {
    let users = await User.find(filter, "-password");
    users = users.filter((user) => user.role === "USER");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

// SignUp Function
const SignUp = async (req, res) => {
  const { username, email, password, number, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "This email is already used." });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const profile = req?.file?.path || null;

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profile,
      number,
      role,
    });

    const tokenData = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      number: newUser.number,
      profile: newUser.profile,
      isActive: newUser.isActive,
      role: newUser.role,
      isVerified: newUser.isVerified,
    };

    const token = await GenerateToken(tokenData);
    const otp = generateOTP();
    otps.set(newUser.email, otp);

    const subject = "Email Verification";
    const html = composeVerificationEmail(newUser.username, token, otp);

    sendMailVerification(newUser.email, subject, html).catch((error) => {
      res.status(500).json({
        message: "Something went wrong. Please try again later.",
        error: error.message,
      });
    });

    res.status(201).json({
      message:
        "Account created. Please check your email to verify your account.",
      user: tokenData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

// Login Function
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with this email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong email or password." });
    }

    const tokenData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      number: user.number,
      profile: user.profile,
      isActive: user.isActive,
      role: user.role,
      isVerified: user.isVerified,
    };

    const token = await GenerateToken(tokenData);

    res.status(200).json({
      message: "Login successful! Welcome back.",
      user: tokenData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

// Verify Account (User or Admin)
const VerifyAccount = async (req, res) => {
  const { token, otp } = req.params;

  try {
    const decoded = JWT.verify(token, process.env.SECRET_KEY);
    const { email } = decoded;

    if (otps.get(email) !== otp) {
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again." });
    }

    const user = await User.findByIdAndUpdate(
      decoded._id,
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const emailSubject =
      user.role === "ADMIN" ? "Admin Approval" : "Account Verified";
    const emailBody = `<h1>${user.role} account verified successfully!</h1>`;
    sendMailVerification(user.email, emailSubject, emailBody).catch((error) => {
      res.status(500).json({
        message: "Something went wrong. Please try again later.",
        error: error.message,
      });
    });

    res.status(200).json({
      message: `${user.role} verified successfully!`,
      user: {
        username: user.username,
        email: user.email,
        isActive: user.isActive,
        isVerified: true,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

// Delete User Function
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please check the user ID." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

// Verify Admin Account
const verifyAdminAccount = async (req, res) => {
  const { adminId } = req.params;

  try {
    const updatedAdmin = await User.findByIdAndUpdate(
      adminId,
      { isActive: true },
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const subject = "Account Approved";
    const html = "<h1>Your account has been approved!</h1>";
    sendMailVerification(updatedAdmin.email, subject, html).catch((error) => {
      res.status(500).json({
        message: "Something went wrong. Please try again later.",
        error: error.message,
      });
    });

    res
      .status(200)
      .json({ message: "Admin verified successfully.", admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

// Block Admin Account
const blockAdminAccount = async (req, res) => {
  const { adminId } = req.params;

  try {
    const updatedAdmin = await User.findByIdAndUpdate(
      adminId,
      { isActive: false },
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const subject = "Account Blocked";
    const html = "<h1>Your account has been blocked.</h1>";
    await sendMailVerification(updatedAdmin.email, subject, html);

    res
      .status(200)
      .json({ message: "Admin blocked successfully.", admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = {
  GetUsers,
  SignUp,
  Login,
  VerifyAccount,
  deleteUser,
  verifyAdminAccount,
  blockAdminAccount,
};
