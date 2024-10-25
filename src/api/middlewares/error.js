/* eslint-disable no-unused-vars */
const APIError = require('../../api/errors/api.error')

/**
 * Error handler middleware.
 *
 * @param {Error} err The error object
 * @param {Express.Request} req The Express.js request object
 * @param {Express.Response} res The Express.js response object
 * @param {Function} next The next middleware to call in the stack
 *
 * @example
 * const express = require('express')
 * const app = express()
 *
 * app.use((err, req, res, next) => {
 *   console.log(err)
 *   res.status(500).json({ error: true, message: err.message })
 * })
 */
const handler = (err, req, res, next) => {
    const statusCode = err.status ? err.status : 500
    res.setHeader('Content-Type', 'application/json')
    res.status(statusCode)
    res.json({
        error: true,
        code: statusCode,
        message: err.message,
        errors: err.errors || null,
    })
}

/**
 * Returns a 404 error with the given error messages.
 *
 * @param {Array.<String>} error - An array of error messages
 * @param {Express.Request} req - The Express.js request object
 * @param {Express.Response} res - The Express.js response object
 * @param {Function} next - The next middleware to call in the stack
 */
exports.notFound = (error, req, res, next) => {
    const err = new APIError({
        message: 'Not found',
        status: 404,
        errors: error,
    })
    return handler(err, req, res)
}

/**
 * @function badRequest
 * @description Builds an APIError and calls the error handler for bad requests (400).
 *              If the error is a validation error, extracts the error messages.
 * @param {Error} error - The error that caused the bad request.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
exports.badRequest = (error, req, res, next) => {
    let message = 'Bad Request'
    let errors = error?.errors || [];
    if (error?.name === 'ValidationError') {
        errors = Object.values(error.errors).map((val) => val.message);
    }
    const apiError = new APIError({
        message,
        errors,
        status: 400
    })
    return handler(apiError, req, res, next);
}

/**
 * @function internalServerError
 * @description Builds an APIError and calls the error handler for internal server errors (500).
 * @param {Error} error - The error that caused the internal server error.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
exports.internalServerError = (error, req, res, next) => {
    const apiError = new APIError({
        message: 'Internal Server Error',
        errors: error,
        status: 500
    })
    return handler(apiError, req, res, next);
}

/**
 * @function unauthorized
 * @description Builds an APIError and calls the error handler for unauthorized access (401).
 * @param {Error} error - The error that caused the unauthorized access.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
exports.unauthorized = (error, req, res, next) => {
    const apiError = new APIError({
        message: 'Unauthorized',
        errors: error,
        status: 401
    })
    return handler(apiError, req, res, next);
}
/**
 * @function forbidden
 * @description Builds an APIError and calls the error handler for forbidden access (403).
 * @param {Error} error - The error that caused the forbidden access.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
exports.forbidden = (error, req, res, next) => {
    const apiError = new APIError({
        message: 'Forbidden',
        errors: error,
        status: 403
    })
    return handler(apiError, req, res, next);
}
exports.handler = handler;