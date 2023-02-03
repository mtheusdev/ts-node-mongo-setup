class ApiError extends Error {
  statusCode;

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends ApiError {
  constructor(message) {
    super(message, 400);
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(message, 404);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
};
