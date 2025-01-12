const isSuperAdmin = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "SUPERADMIN") next();
    else return res.status(403).json({ message: "Unauthorized" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "ADMIN") next();
    else return res.status(403).json({ message: "Unauthorized" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const isNotUser = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "USER") {
      req.user.isUser = false;
      next();
    } else return res.status(403).json({ message: "Unauthorized" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  isSuperAdmin,
  isAdmin,
  isNotUser,
};
