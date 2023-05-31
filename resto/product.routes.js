const express = require('express');
const {
    registerProduct
} = require('./product.controller');
const {
    protect,
    role
} = require('../middlewares/protect');
const router = express.Router();
router.route('/')
    .post(protect, role('admin'), registerProduct)
module.exports.product=router