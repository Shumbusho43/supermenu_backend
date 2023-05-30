const expess = require('express');
const {
    register,
    getAll,
    getById,
    search
} = require('./resto.controller');
const {
    protect,
    role
} = require('../middlewares/protect');
const router = expess.Router();
router.route('/')
    .post(protect, role('admin'), register)
    .get(getAll);
router.route('/:id')
    .get(getById);
router.route('/search/:name')
    .get(search);
module.exports.restaurantRouter = router;