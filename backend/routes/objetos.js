const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Get all
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM objetos';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        res.json(results);
    });
});

// Get by id
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM objetos WHERE id = ?';
    connection.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Objeto no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Post
router.post('/', (req, res) => {
    const { nombre, descripcion, tipo } = req.body;
    const sql = `INSERT INTO objetos (nombre, descripcion, tipo) 
                 VALUES (?, ?, ?)`;
    connection.query(sql, [nombre, descripcion, tipo], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error al crear objeto' });
            return;
        }
        res.status(201).json({ id: result.insertId, message: 'Objeto creado' });
    });
});

// Put
router.put('/:id', (req, res) => {
    const { nombre, descripcion, tipo } = req.body;

    if (!nombre || !descripcion || !tipo) {
        if (!nombre) res.status(400).json({ error: 'Faltan campos: nombre' });
        if (!descripcion) res.status(400).json({ error: 'Faltan campos: descripcion' });
        if (!tipo) res.status(400).json({ error: 'Faltan campos: tipo' });
        return;
    }

    const sql = `UPDATE objetos SET nombre = ?, descripcion = ?, tipo = ? WHERE id = ?`;
    connection.query(sql, [nombre, descripcion, tipo, req.params.id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Objeto no encontrado' });
            return;
        }
        res.json({ message: 'Objeto actualizado correctamente' });
    });
});

// Delete
router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM objetos WHERE id = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Objeto no encontrado' });
            return;
        }
        res.json({ message: 'Objeto eliminado correctamente' });
    });
});

module.exports = router;