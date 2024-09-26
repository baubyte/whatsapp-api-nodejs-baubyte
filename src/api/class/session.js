/* eslint-disable no-unsafe-optional-chaining */
const { WhatsAppInstance } = require('../class/instance')
const logger = require('pino')()
const config = require('../../config/config')
const useMongoDBWebhookState = require('../helper/webhookState')

class Session {
    async restoreSessions() {
        let restoredSessions = new Array()
        let allCollections = []
        try {
            const db = mongoClient.db('whatsapp-api')
            const result = await db.listCollections().toArray()
            result.forEach((collection) => {
                allCollections.push(collection.name)
            });
            allCollections = result.map((collection) => collection.name);
            for (const key of allCollections) {
                try {
                    const { getWebhookState } = useMongoDBWebhookState(db.collection(key))
                    const webhookData = await getWebhookState(key)
                    const customWebhookUrl = webhookData?.customWebhook ? webhookData?.customWebhook : undefined;
                    const defaultWebhookUrl = config.webhookUrl ? config.webhookUrl : undefined;
                    const webhookEnabledCustom = webhookData?.webhookEnabled ? webhookData?.webhookEnabled : undefined;
                    const webhookEnabledDefault = config.webhookEnabled ? config.webhookEnabled : undefined;
                    const webhook = webhookEnabledCustom ? webhookEnabledCustom : webhookEnabledDefault;
                    const webhookUrl = customWebhookUrl ? customWebhookUrl : defaultWebhookUrl;

                    const instance = new WhatsAppInstance(key, webhook, webhookUrl)
                    await instance.init()
                    WhatsAppInstances[key] = instance
                    restoredSessions.push(key)
                } catch (err) {
                    logger.error(`Error restoring session for collection ${key}`)
                    logger.error(err)
                }
            }
        } catch (e) {
            logger.error('Error restoring sessions')
            logger.error(e)
        }
        return restoredSessions
    }
}

exports.Session = Session
