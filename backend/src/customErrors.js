class CustomError extends Error {
  constructor(message, status, additionalInfo = undefined) {
    super(message);
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message, 404);
  }
}

class InternalServerError extends CustomError {
  constructor(message) {
    super(message, 500);
  }
}

module.exports = { NotFoundError, InternalServerError };
