const express = require('express');
const router = express.Router();

const homeRoutes = require('./home');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/api', apiRoutes);

module.exports = router;
