const User = require("../models/user");

exports.adminCheck = async (req, res, next) => {
  const { name } = req.name;
  const adminUser = await User.findOne({ name }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: " Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
