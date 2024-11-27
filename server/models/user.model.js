const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "SUPERADMIN"],
      default: "USER",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    number: {
      type: Number,
      default: 0,
      min: [0, "Number cannot be less than 0"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: String,
      default: "No profile picture uploaded",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email already exists"));
  } else {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
