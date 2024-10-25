const config = require('../../config/config');
const Client = require('../models/client.model');
const { forbidden } = require('./error');

/**
 * Token verification middleware.
 *
 * @param {Express.Request} req The Express.js request object
 * @param {Express.Response} res The Express.js response object
 * @param {Function} next The next middleware to call in the stack
 *
 * @example
 * const express = require('express')
 * const app = express()
 * const { tokenVerification } = require('./tokenCheck')
 *
 * app.use(tokenVerification)
 */
async function tokenVerification(request, response, next) {
    const resource = request.path.split('/').at(1);
    const route = request.path.split('/').at(2) || request.path.split('/').at(1);
    if (resource === 'instance' && route === 'qr') {
        return next();
    }
    const authorization = request.header("Authorization");
    if (!authorization) {
        return forbidden(['no authorization header was present'], request, response, next)
    }
    if (!authorization.startsWith("Bearer ")) {
        return unauthorized(['invalid bearer token supplied'], request, response, next)
    }
    const token = authorization.split(" ").at(1) || "";
    const tokenIsAdmin = token === config.token;
    const client = await Client.findOne({ apiKey:token, isActive: true });
    if (!tokenIsAdmin && !client) {
        return forbidden(['invalid bearer token supplied'], request, response, next)
    }
    request.body.apiKey = client?.apiKey || token;
    request.body.tokenIsAdmin = tokenIsAdmin;
    next();
}

module.exports = tokenVerification
