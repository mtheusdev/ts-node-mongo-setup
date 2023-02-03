const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET ?? "", {
    expiresIn: "8h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET ?? "");
};

module.exports = {
  generateToken,
  verifyToken,
};
