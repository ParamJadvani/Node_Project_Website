require("dotenv").config();
const JWT = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const GenerateToken = async (data) => {
  return JWT.sign(data, SECRET_KEY);
};

const verifiyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    try {
      const decodeData = await JWT.verify(token, SECRET_KEY);
      if (!decodeData) {
        return res.status(401).json({ message: "InValid Token" });
      }
      req.user = decodeData;
      return next();
    } catch (error) {
      res.status(error.statusCode).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { GenerateToken, verifiyToken };
