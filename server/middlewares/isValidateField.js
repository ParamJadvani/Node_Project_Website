const isValidateField = (req, res, next) => {
  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) next();
  else return res.status(402).json({ message: "Invalid email address" });
};

module.exports = isValidateField;
