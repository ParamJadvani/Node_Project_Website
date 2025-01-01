const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const UserRouter = require("./routes/user.routes");
const path = require("path");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const { verifyToken } = require("./middlewares/JWT_AUTH");
const commentRouter = require("./routes/comment.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

app.use("/user", UserRouter);
app.use("/product", productRouter);
app.use("/cart", verifyToken, cartRouter);
app.use("/comment", commentRouter);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to Project" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbConnect();
});
