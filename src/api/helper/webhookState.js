module.exports = useMongoDBWebhookState = (collection) => {
    const saveWebhookState = async (key, webhookEnabled, customWebhook) => {
        const data = { webhookEnabled }
        if (customWebhook) {
            data.customWebhook = customWebhook
        }

        await collection.updateOne(
            { key },
            { $set: data },
            { upsert: true } // Crea o actualiza el documento
        )
    }

    const getWebhookState = async (key) => {
        return await collection.findOne({ key }, { projection: { webhookEnabled: 1, customWebhook: 1 } })
    }

    return {
        saveWebhookState,
        getWebhookState,
    }
}
