const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - listar todos os livros
router.get('/', (req, res) => {
  db.query('SELECT * FROM livros', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET - detalhe de um livro
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM livros WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(results[0]);
  });
});

// POST - criar um livro
router.post('/', (req, res) => {
  const { titulo, autor, genero, ano_publicacao, isbn, quantidade } = req.body;
  if (!titulo || !autor) return res.status(400).json({ error: 'Título e autor são obrigatórios' });
  db.query(
    'INSERT INTO livros (titulo, autor, genero, ano_publicacao, isbn, quantidade) VALUES (?, ?, ?, ?, ?, ?)',
    [titulo, autor, genero, ano_publicacao, isbn, quantidade],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    }
  );
});

// PUT - atualizar um livro
router.put('/:id', (req, res) => {
  const { titulo, autor, genero, ano_publicacao, isbn, quantidade } = req.body;
  db.query(
    'UPDATE livros SET titulo=?, autor=?, genero=?, ano_publicacao=?, isbn=?, quantidade=? WHERE id=?',
    [titulo, autor, genero, ano_publicacao, isbn, quantidade, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Atualizado com sucesso' });
    }
  );
});

// DELETE - remover um livro
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM livros WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Removido com sucesso' });
  });
});

module.exports = router;