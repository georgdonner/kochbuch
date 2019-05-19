class StatusError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = httpStatus;
  }
}

module.exports = StatusError;
