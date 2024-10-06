/* eslint-disable no-unused-vars */
const APIError = require('../../api/errors/api.error')

const handler = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500
    console.log(err);
    
    res.setHeader('Content-Type', 'application/json')
    res.status(statusCode)
    res.json({
        error: true,
        code: statusCode,
        message: err.message,
    })
}

exports.handler = handler

exports.notFound = (req, res, next) => {
    const err = new APIError({
        message: 'Not found',
        statusCode: 404,
    })
    return handler(err, req, res)
}

exports.badRequest = (error, req, res, next) => {
    let message = 'Bad Request'
    if (error?.name === 'ValidationError') {
        message = Object.values(error.errors).map((val) => val.message);
    }
    const apiError = {
        message,
        statusCode: 400,
    }
    return handler(apiError, req, res, next);
}
