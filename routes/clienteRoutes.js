const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');
const validator = require('../validators/clienteValidator');

router.post('/clientes', validator.validarCriacao, controller.criarCliente);
router.get('/clientes/:codigo', controller.obterClientePorCodigo);
router.get('/clientes', controller.listarClientes);
router.put('/clientes/:codigo', validator.validarAtualizacao, controller.atualizarCliente);
router.delete('/clientes/:codigo', controller.excluirCliente);

module.exports = router;
