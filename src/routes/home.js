const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const UserController = require('../controllers/UserController');
const { authMiddleware } = require('../middlewares/auth');

router.get('/', HomeController.index);
router.get('/about', HomeController.about);
router.get('/dashboard', authMiddleware, UserController.dashboard);

module.exports = router;
