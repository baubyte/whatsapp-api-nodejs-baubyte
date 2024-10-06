const { badRequest } = require("../middlewares/error");
const Client = require("../models/client.model");

exports.create = async (request, response) => {
    try {
        const clientData = request.body;
        const client = await Client.create(clientData);
        console.log(client);
        
    } catch (err) {
        return badRequest(err, request, response);
    }
}