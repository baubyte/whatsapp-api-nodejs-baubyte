const { badRequest, notFound } = require("../middlewares/error");
const { v4: uuidv4 } = require('uuid')
const Client = require("../models/client.model");

/**
 * Create a new client
 * @param {import('express').Request} request - request object
 * @param {import('express').Response} response - response object
 * @returns {Promise<void>}
 */
exports.create = async (request, response) => {
    try {
        const clientData = request.body;
        clientData.apiKey = uuidv4();
        const client = await Client.create(clientData);
        return response.status(201).json({ error: false, data: client });
    } catch (err) {
        return badRequest(err, request, response);
    }
}

/**
 * Update a client
 * @param {import('express').Request} request - request object
 * @param {import('express').Response} response - response object
 * @returns {Promise<void>}
 */
exports.update = async (request, response) => {
    try {
        const clientData = request.body;
        const client = await Client.findOne({apiKey: request.params.apiKey });
        if (!client) {
            return notFound([`Client ${clientData.apiKey} not found`], request, response);
        }
        const { name, adicionalInfo, isActive } = clientData;
        if (name) {
            client.name = name;
        }
        if (adicionalInfo) {
            client.adicionalInfo = adicionalInfo;
        }
        if (isActive && typeof isActive !== 'boolean') {
            client.isActive = (isActive === 'true');
        }
        await client.save();
        return response.status(200).json({ error: false, data: client });
        client.isActive = isActiveBoolean;
        await client.save();
        return response.status(200).json({ error: false, data: client });
    } catch (err) {
        return internalServerError(err, request, response);
    }
}
/**
 * Delete a client
 * @param {import('express').Request} request - request object
 * @param {import('express').Response} response - response object
 * @returns {Promise<void>}
 */
exports.delete = async (request, response) => {
    try {
        const client = await Client.findOne({ apiKey: request.params.id });
        if (!client) {
            return notFound([`Client ${request.params.id} not found`], request, response);
        }
        await client.deleteOne();
        return response.status(200).json({ error: false, data: client });
    } catch (err) {
        return internalServerError(err, request, response);
    }
}
/**
 * Deactivate a client
 * @param {import('express').Request} request - request object
 * @param {import('express').Response} response - response object
 * @returns {Promise<void>}
 */
exports.deactivate = async (request, response) => {
    try {
        const client = await Client.findOne({ apiKey: request.params.apiKey });
        if (!client) {
            return notFound([`Client ${request.params.apiKey} not found`], request, response);
        }
        client.isActive = false;
        await client.save();
        return response.status(200).json({ error: false, data: client });
    } catch (err) {
        return internalServerError(err, request, response);
    }
}

/**
 * List all clients
 * @param {import('express').Request} request - request object
 * @param {import('express').Response} response - response object
 * @returns {Promise<void>}
 */
exports.list = async (request, response) => {
    try {
        const clients = await Client.find();
        if (!clients) {
            return notFound([`Clients not found`], request, response);
        }
        return response.status(200).json({ error: false, data: clients });
    } catch (err) {
        return internalServerError(err, request, response);
    }
}

/**
 * Get a client by id
 * @param {import('express').Request} request - request object
 * @param {import('express').Response} response - response object
 * @returns {Promise<void>}
 */
exports.get = async (request, response) => {
    try {
        const client = await Client.findOne({ apiKey: request.params.apiKey });
        if (!client) {
            return notFound([`Client ${request.params.apiKey} not found`], request, response);
        }
        return response.status(200).json({ error: false, data: client });
    } catch (err) {
        return internalServerError(err, request, response);
    }
}