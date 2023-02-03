const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET ?? "", {
    expiresIn: process.env.NODE_ENV === "production" ? "8h" : "3d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET ?? "");
};

module.exports = {
  generateToken,
  verifyToken,
};
