const { badRequest } = require("../middlewares/error");
const { v4: uuidv4 } = require('uuid')
const Client = require("../models/client.model");

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

exports.update = async (request, response) => {
    try {
        const clientData = request.body;
        const client = await Client.findOne({apiKey: request.params.id });
        if (!client) {
            return notFound([`Client ${clientData.id} not found`], request, response);
        }
        const { name, adicionalInfo } = clientData;
        if (name) {
            client.name = name;
        }
        if (adicionalInfo) {
            client.adicionalInfo = adicionalInfo;
        }
        await client.save();
        return response.status(200).json({ error: false, data: client });
    } catch (err) {
        return internalServerError(err, request, response);
    }
}
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
exports.deactivate = async (request, response) => {
    try {
        const client = await Client.findOne({ apiKey: request.params.id });
        if (!client) {
            return notFound([`Client ${request.params.id} not found`], request, response);
        }
        client.isActive = false;
        await client.save();
        return response.status(200).json({ error: false, data: client });
    } catch (err) {
        return internalServerError(err, request, response);
    }
}

exports.list = async (request, response) => {
    try {
        const clients = await Client.find();
        return response.status(200).json({ error: false, data: clients });
    } catch (err) {
        return internalServerError(err, request, response);
    }
}

exports.get = async (request, response) => {
    try {
        const client = await Client.findOne({ apiKey: request.params.id });
        if (!client) {
            return notFound([`Client ${request.params.id} not found`], request, response);
        }
        return response.status(200).json({ error: false, data: client });
    } catch (err) {
        return internalServerError(err, request, response);
    }
}