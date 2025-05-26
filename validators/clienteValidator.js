const { body } = require('express-validator');

exports.validarCriacao = [
  body('nome').notEmpty().withMessage('Nome é obrigatório.'),
  body('cpf').isLength({ min: 11, max: 11 }).withMessage('CPF deve ter 11 dígitos.'),
  body('cep').optional().isLength({ min: 8, max: 8 }).withMessage('CEP inválido.'),
  body('telefone').optional().isLength({ min: 10 }).withMessage('Telefone inválido.'),
  body('data_nascimento').optional().isDate().withMessage('Data de nascimento inválida.')
];

exports.validarAtualizacao = [
  body('cpf').optional().isLength({ min: 11, max: 11 }).withMessage('CPF deve ter 11 dígitos.'),
  body('cep').optional().isLength({ min: 8, max: 8 }).withMessage('CEP inválido.'),
  body('telefone').optional().isLength({ min: 10 }).withMessage('Telefone inválido.'),
  body('data_nascimento').optional().isDate().withMessage('Data de nascimento inválida.')
];
