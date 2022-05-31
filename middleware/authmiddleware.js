const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const authMiddleware = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const jwttoken = authHeader.split(" ");
  if (!authHeader || jwttoken[0] !== "Bearer") {
    return next(createCustomError("Unauthorised to access data", 401));
  }
  const token = jwttoken[1];
  await jwt.verify(token, process.env.SECRET);
  next();
});

module.exports = authMiddleware;
