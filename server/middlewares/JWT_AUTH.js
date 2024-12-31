require("dotenv").config();
const JWT = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const GenerateToken = async (data) => {
  return new Promise((resolve, reject) => {
    JWT.sign(data, SECRET_KEY, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    try {
      const decodeToken = () => {
        return new Promise((resolve, reject) => {
          JWT.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          });
        });
      };

      const decodeData = await decodeToken();
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

module.exports = { GenerateToken, verifyToken };
