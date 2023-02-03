/* eslint-disable @typescript-eslint/no-unused-vars */
// const { UnauthorizedError, ApiError } = require("../helpers/api-errors");
// const { verifyToken } = require("../helpers/auth");
// const UserService = require("../services/UserService");

const middlewareError = (error, _req, res, _next) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal Server Error";
  res.status(statusCode).send({ message });
};

// export const authMiddleware = async (
//   req: Request,
//   _res: Response,
//   next: NextFunction
// ) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     throw new UnauthorizedError("Unauthorized");
//   }

//   const { id } = verifyToken(authorization.split(" ")[1]) as IJwtPayload;
//   const user = await UserService.findOneById(id);

//   if (!user) {
//     throw new UnauthorizedError("Unauthorized");
//   }

//   req.user = user;

//   next();
// };

module.exports = {
  middlewareError,
  // authMiddleware,
};
