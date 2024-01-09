const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware"); 


router.post('/signup', userController.createUser)
router.post('/signin', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.put('/update_user/:id', authUserMiddleWare, userController.updateUser)
router.delete('/delete_user/:id', authMiddleWare, userController.deleteUser)
router.get('/getAll', authMiddleWare, userController.getAllUser)
router.get('/getDetail/:id', authUserMiddleWare, userController.getDetailUser)
router.post('/refresh_token', userController.refreshlToken)
router.post('/delete_many', authMiddleWare, userController.deleteMany)


module.exports = router