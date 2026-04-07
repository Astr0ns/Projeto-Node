const express = require('express');
const router = express.Router();

const homeRoutes = require('./home');
const authRoutes = require('./auth');
const userRoutes = require('./users');

router.use('/', homeRoutes);
router.use('/', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
