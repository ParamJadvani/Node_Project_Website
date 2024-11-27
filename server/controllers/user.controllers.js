const bcrypt = require("bcrypt");
const { GenerateToken } = require("../middlewares/JWT_AUTH");
const User = require("../models/user.model");
const sendEmailVerification = require("../service/sendMail");
const { generateOTP, composeVerificationEmail } = require("../helper/helper");
const JWT = require("jsonwebtoken");

const otps = new Map();

const GetUser = async (req, res) => {
  try {
    const users = await User.find({}, "-hashedPassword");
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

const SignUp = async (req, res) => {
  const { username, email, password, number } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "This email is already used." });

    const hashedPassword = await bcrypt.hash(password, 11);
    const profile = req?.files?.path || null;

    const newUser = await User.create({
      username,
      email,
      hashedPassword,
      profile,
      number,
    });

    const tokenData = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      number: newUser.number,
      profile: newUser.profile,
      isActive: newUser.isActive,
      role: newUser.role,
    };

    const token = await GenerateToken(tokenData);
    const otp = generateOTP();
    otps.set(newUser.email, otp);

    const subject = "Email Verification";
    const html = composeVerificationEmail(newUser.username, token, otp);

    await sendEmailVerification(newUser.email, subject, html);

    res.status(201).json({
      message:
        "Account created. Please check your email to verify your account.",
      user: { ...tokenData, isVerified: newUser.isVerified },
      token,
    });
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "No account found with this email." });

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid)
      return res
        .status(401)
        .json({ message: "Wrong email or password. Please try again." });

    const tokenData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      number: user.number,
      profile: user.profile,
      isActive: user.isActive,
      role: user.role,
    };
    const token = await GenerateToken(tokenData);

    res.status(200).json({
      message: "Login successful! Welcome back.",
      user: { ...tokenData, isVerified: user.isVerified },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

const VerifyEmail = async (req, res) => {
  const { token, otp } = req.params;

  try {
    const decoded = JWT.verify(token, process.env.SECRET_KEY);
    const { email } = decoded;

    if (otps.get(email) !== otp) {
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again." });
    }

    await User.findByIdAndUpdate(
      decoded._id,
      { isVerified: true },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Email verified successfully! You can now log in." });
  } catch (error) {
    console.error("Error verifying email:", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found. Please check the user ID." });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

module.exports = { GetUser, SignUp, Login, VerifyEmail,deleteUser };
