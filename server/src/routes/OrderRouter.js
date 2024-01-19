const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', authUserMiddleWare, OrderController.createOrder)
router.get('/get_all_order/:id',authUserMiddleWare, OrderController.getAllOrderDetails)
router.get('/get_details_order/:id', OrderController.getDetailsOrder)
router.delete('/cancel_order/:id',authUserMiddleWare, OrderController.cancelOrderDetails)
router.get('/get_all_order',authMiddleWare, OrderController.getAllOrder)


module.exports = router