const Cliente = require('../models/cliente');
const { validationResult } = require('express-validator');

// CREATE
exports.criarCliente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() });

  const { cpf } = req.body;

  try {
    const existe = await Cliente.findOne({ where: { cpf } });
    if (existe) return res.status(400).json({ erro: 'CPF já cadastrado.' });

    const cliente = await Cliente.create(req.body);
    return res.status(201).json(cliente);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
};

// READ INDIVIDUAL
exports.obterClientePorCodigo = async (req, res) => {
  const { codigo } = req.params;

  try {
    const cliente = await Cliente.findByPk(codigo);
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado.' });

    return res.status(200).json(cliente);
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

// READ ALL
exports.listarClientes = async (req, res) => {
  const { nome, cidade, uf } = req.query;

  const filtros = {};
  if (nome) filtros.nome = nome;
  if (cidade) filtros.cidade = cidade;
  if (uf) filtros.uf = uf;

  try {
    const clientes = await Cliente.findAll({ where: filtros });
    return res.status(200).json(clientes);
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

// UPDATE
exports.atualizarCliente = async (req, res) => {
  const { codigo } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() });

  try {
    const cliente = await Cliente.findByPk(codigo);
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado.' });

    if (req.body.cpf && req.body.cpf !== cliente.cpf) {
      const cpfExistente = await Cliente.findOne({ where: { cpf: req.body.cpf } });
      if (cpfExistente) return res.status(400).json({ erro: 'CPF já cadastrado por outro cliente.' });
    }

    await cliente.update(req.body);
    return res.status(200).json(cliente);
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

// DELETE
exports.excluirCliente = async (req, res) => {
  const { codigo } = req.params;

  try {
    const cliente = await Cliente.findByPk(codigo);
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado.' });

    await cliente.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};
