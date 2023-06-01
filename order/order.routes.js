const express = require('express');
const router = express.Router();
const {
    protect
} = require('../middlewares/protect');
const orderController = require('./order.controller');
router.route('/').post(protect, orderController.createOrderController);
exports.orderRouter = router;