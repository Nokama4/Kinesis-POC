/* eslint-disable max-classes-per-file */

/**
 * Class to construct the error.
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(error, status, isPublic) {
    super(error);

    this.name = this.constructor.name;
    this.message = error;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export default class APIError extends ExtendableError {
  /**
   * Create an API error.
   * @param {String} error - Error error.
   * @param {Number} status - HTTP-Status code of error.
   * @param {Boolean} isPublic - If error should be visible to user or not.
   */
  constructor(error, status, isPublic = true) {
    super(error, status, isPublic);
  }
}
