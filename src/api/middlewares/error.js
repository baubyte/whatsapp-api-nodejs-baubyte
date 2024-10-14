/* eslint-disable no-unused-vars */
const APIError = require('../../api/errors/api.error')

const handler = (err, req, res, next) => {
    const statusCode = err.status ? err.status : 500
    console.log(err);
    
    res.setHeader('Content-Type', 'application/json')
    res.status(statusCode)
    res.json({
        error: true,
        code: statusCode,
        message: err.message,
        errors: err.errors || null,
    })
}

exports.notFound = (error, req, res, next) => {
    const err = new APIError({
        message: 'Not found',
        status: 404,
        errors: error,
    })
    return handler(err, req, res)
}

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

exports.internalServerError = (error, req, res, next) => {
    const apiError = new APIError({
        message: 'Internal Server Error',
        errors: error,
        status: 500
    })
    return handler(apiError, req, res, next);
}

exports.handler = handler;