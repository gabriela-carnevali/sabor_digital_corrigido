const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const routes = require('./routes'); 
const authRoutes = require('./routes/authRoutes')

// Middlewares globais
app.use(cors()); // Habilita o CORS para permitir requisições do frontend
app.use(express.json());

// Servir arquivos estáticos (como as imagens de uploads)
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Registro de todas as rotas da API centralizadas
app.use('/', routes);

app.use('/auth', authRoutes)

module.exports = app;