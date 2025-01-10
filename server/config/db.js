const { default: mongoose } = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Successfully connected to Mongoose DataBase");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = dbConnect;
