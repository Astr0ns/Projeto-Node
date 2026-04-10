const express = require('express');
const router = express.Router();
const { validateCPF } = require('../helpers/cpfValidator');

router.get('/cpf/:cpf', async (req, res) => {
  const result = await validateCPF(req.params.cpf);
  res.json({ valid: result.valid, cleaned: result.cleaned });
});

module.exports = router;
