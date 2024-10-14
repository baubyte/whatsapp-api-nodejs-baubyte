const express               = require('express');
const controller            = require('../controllers/client.controller');
const { validateFields }    = require('../middlewares/validateFields');
const { body, param } = require('express-validator');

const router = express.Router();
router.route('/create').post(controller.create);
router.route('/update/:id').put(param('id').isUUID().withMessage('Invalid id'),validateFields,controller.update);
router.route('/delete/:id').delete(param('id').isUUID().withMessage('Invalid id'),validateFields,controller.delete);
router.route('/list').get(controller.list);
router.route('/get/:id').get(param('id').isUUID().withMessage('Invalid id'),validateFields,controller.get);
router.route('/deactivate/:id').put(param('id').isUUID().withMessage('Invalid id'),validateFields,controller.deactivate);

module.exports = router
