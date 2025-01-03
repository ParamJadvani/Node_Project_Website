const isValidateField = (req, res, next) => {
  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) next();
  else return res.status(402).json({ message: "Invalid email address" });
};

const isExistFields = (req, res, next) => {
  // Validate required fields
  const { title, description, price, category, InStockQty } = req.body;
  if (!title || !description || !price || !category || !InStockQty) {
    return res.status(400).json({ message: "All fields are required." });
  }
  next();
};

module.exports = {
  isValidateField,
  isExistFields,
};
