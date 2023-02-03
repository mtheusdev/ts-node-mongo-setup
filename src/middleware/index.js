const { UnauthorizedError } = require("../helpers/api-errors");
const { verifyToken } = require("../helpers/auth");
const UserService = require("../services/UserService");

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (error, _req, res, _next) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal Server Error";
  res.status(statusCode).send({ message });
};

const authMiddleware = async (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Unauthorized");
  }

  const { id } = verifyToken(authorization.split(" ")[1]);
  const user = await UserService.findOneById(id);

  if (!user) {
    throw new UnauthorizedError("Unauthorized");
  }

  next();
};

module.exports = {
  errorMiddleware,
  authMiddleware,
};
