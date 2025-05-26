const express = require('express');
require('dotenv').config();
const app = express();
const sequelize = require('./config/database');
const clienteRoutes = require('./routes/clienteRoutes');

app.use(express.json());
app.use('/', clienteRoutes);

sequelize.sync()
  .then(() => {
    console.log('Banco conectado e sincronizado.');
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco:', err);
  });
