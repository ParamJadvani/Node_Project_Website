const { default: mongoose } = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to Mongoose DataBase");
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConnect;
