const User = require("../models/user");

const init = async () => {
  let admin = new User({
    name: "admin@company.com",
    password: "admin",
    role: "admin",
  });
  await admin.save();
  for (let c = 1; c <= 5; c++) {
    let user = new User({
      name: `user${c}@company.com`,
      password: `user${c}`,
    });
    await user.save();
  }
};

const authenticate = async (uname, pwd) => {
  console.log(uname + " " + pwd);
  const adminUser = await User.findOne({
    name: uname,
    password: pwd,
  }).exec();
  if (!adminUser) return false;
  else return true;
};

const getAllUsers = async () => {
  const users = await User.find({
    role: "user",
  }).exec();
  console.log(users);
  return users;
};

const isAdmin = async (uname) => {
  const user = await User.findOne({
    name: uname,
  }).exec();
  return user.role == "admin" ? true : false;
};

module.exports = {
  init: init,
  authenticate: authenticate,
  getAllUsers: getAllUsers,
  isAdmin: isAdmin,
};
