const express = require('express');
const cors = require('cors');
const livrosRoutes = require('./routes/livros');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/livros', livrosRoutes);

app.listen(3001, () => console.log('Servidor rodando na porta 3001 :D'));