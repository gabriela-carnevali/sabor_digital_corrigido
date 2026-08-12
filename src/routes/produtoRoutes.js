const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');
const upload = require('../config/multer');

router.get('/', ProdutoController.listar);
router.get('/:id', ProdutoController.buscarPorId);
router.post('/', upload.single('foto'), ProdutoController.cadastrar);
router.put('/:id', upload.single('foto'), ProdutoController.atualizar);
router.delete('/:id', ProdutoController.deletar);

module.exports = router;
