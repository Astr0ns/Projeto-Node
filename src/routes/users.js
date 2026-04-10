const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleware } = require('../middlewares/auth');
const { adminMiddleware } = require('../middlewares/admin');

// Todas as rotas de usuário exigem login
router.use(authMiddleware);

router.get('/',           adminMiddleware, UserController.index);
router.get('/:id',        UserController.show);
router.get('/:id/edit',   UserController.edit);
router.put('/:id',        UserController.update);
router.delete('/:id',     UserController.destroy);

module.exports = router;
