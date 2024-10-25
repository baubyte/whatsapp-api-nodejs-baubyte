const express               = require('express');
const controller            = require('../controllers/client.controller');
const { validateFields }    = require('../middlewares/validateFields');
const { body, param } = require('express-validator');

const router = express.Router();
router.route('/create').post(controller.create);
router.route('/update/:apiKey').put(param('apiKey').isUUID().withMessage('Invalid apiKey client'),validateFields,controller.update);
router.route('/delete/:apiKey').delete(param('apiKey').isUUID().withMessage('Invalid apiKey client'),validateFields,controller.delete);
router.route('/list').get(controller.list);
router.route('/get/:apiKey').get(param('apiKey').isUUID().withMessage('Invalid apiKey client'),validateFields,controller.get);
router.route('/deactivate/:apiKey').put(param('apiKey').isUUID().withMessage('Invalid apiKey client'),validateFields,controller.deactivate);

module.exports = router
