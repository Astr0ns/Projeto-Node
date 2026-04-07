const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { guestMiddleware } = require('../middlewares/auth');

router.get('/login',    guestMiddleware, AuthController.showLogin);
router.post('/login',   guestMiddleware, AuthController.login);
router.get('/register', guestMiddleware, AuthController.showRegister);
router.post('/register',guestMiddleware, AuthController.register);
router.post('/logout',  AuthController.logout);

module.exports = router;
