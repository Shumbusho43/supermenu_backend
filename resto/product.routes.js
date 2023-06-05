const express = require('express');
const {
    registerProduct,
    getProductById
} = require('./product.controller');
const {
    protect,
    role
} = require('../middlewares/protect');
const router = express.Router();
router.route('/')
    .post(protect, role('admin'), registerProduct)
router.route('/:id')
    .get(protect, getProductById)
module.exports.product = router