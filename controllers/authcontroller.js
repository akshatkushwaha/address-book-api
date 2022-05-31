const User = require("../models/user");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = asyncWrapper(async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    return next(createCustomError(`No user not found`, 404));
  } else if (user.password != req.body.password) {
    return next(createCustomError("Incorrect password", 401));
  }
  const token = await jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRET,
    {
      expiresIn: "30d",
    }
  );
  res.status(200).json({ success: true, data: { data: user, token: token } });
});

const register = asyncWrapper(async (req, res, next) => {
  const userCheck = await User.findOne({ username: req.body.username });
  if (!userCheck) {
    const user = await User.create(req.body);
    const token = await jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.status(201).json({ success: true, data: { data: user, token: token } });
  } else {
    return next(createCustomError("User already exist", 401));
  }
});

module.exports = {
  login,
  register,
};
