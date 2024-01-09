const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleWare, ProductController.updateProduct)
router.get('/detail/:id', ProductController.getDetailsProduct)
router.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct)
router.get('/get_all', ProductController.getAllProduct)
router.post('/delete_many', authMiddleWare, ProductController.deleteMany)
router.get('/get_all_type', ProductController.getAllType)

module.exports = router