const { validationResult } = require('express-validator');
const { badRequest } = require('./error');
const ExtendableError = require('../errors/extendable.error');
const validateFields = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        const error = new ExtendableError({
            message: 'Invalid input',
            errors: errors.array(),
            status: 400
        })
        return badRequest(error, request, response);
    }
    next();
}
module.exports = {
    validateFields
}