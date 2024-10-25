const config = require('../../config/config');
const { forbidden, unauthorized } = require('./error');
/**
 * Token verification middleware for admin access.
 *
 * @param {Express.Request} req The Express.js request object
 * @param {Express.Response} res The Express.js response object
 * @param {Function} next The next middleware to call in the stack
 *
 * @example
 * const express = require('express')
 * const app = express()
 * const { tokenIsAdmin } = require('./tokenIsAdmin')
 *
 * app.use(tokenIsAdmin)
 */
function tokenIsAdmin(request, response, next) {
    const authorization = request.header("Authorization");
    if (!authorization) {
        return forbidden(['no authorization header was present'], request, response, next)
    }
    if (!authorization.startsWith("Bearer ")) {
        return unauthorized(['invalid bearer token supplied'], request, response, next)
    }
    const token = authorization.split(" ").at(1) || "";
    if (config.protectRoutes) {
        if (!token) {
            return forbidden(['no bearer token header was present'], request, response, next)
        }
        if (token !== config.token) {
            return unauthorized(['not authorized to access this resource'], request, response, next)
        }
    }
    next();
}

module.exports = tokenIsAdmin
