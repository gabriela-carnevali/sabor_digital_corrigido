const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.get('/', UsuarioController.listar);
router.get('/:id', UsuarioController.buscarPorId);
router.post('/registrar', UsuarioController.cadastrar);
router.post('/login', UsuarioController.login)
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

module.exports = router;