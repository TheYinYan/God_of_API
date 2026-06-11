const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Get all
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM reinos';
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
    const sql = 'SELECT * FROM reinos WHERE id = ?';
    connection.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Reino no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Post
router.post('/', (req, res) => {
    const { nombre, descripcion, ubicacion, habitantes } = req.body;

    if (!nombre || !descripcion || !ubicacion) {
        if (!nombre) res.status(400).json({ error: 'Faltan campos: nombre' });
        if (!descripcion) res.status(400).json({ error: 'Faltan campos: descripcion' });
        if (!ubicacion) res.status(400).json({ error: 'Faltan campos: ubicacion' });
        return;
    }

    const sql = `INSERT INTO reinos (nombre, descripcion, ubicacion, habitantes) 
                 VALUES (?, ?, ?, ?)`;
    connection.query(sql, [nombre, descripcion, ubicacion, habitantes], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        res.json({ message: 'Reino creado correctamente', id: result.insertId });
    });
});

// Put
router.put('/:id', (req, res) => {
    const { nombre, descripcion, ubicacion, habitantes } = req.body;

    if (!nombre || !descripcion || !ubicacion) {
        if (!nombre) res.status(400).json({ error: 'Faltan campos: nombre' });
        if (!descripcion) res.status(400).json({ error: 'Faltan campos: descripcion' });
        if (!ubicacion) res.status(400).json({ error: 'Faltan campos: ubicacion' });
        return;
    }
    const sql = `UPDATE reinos SET nombre=?, descripcion=?, ubicacion=?, habitantes=? 
                 WHERE id=?`;
    connection.query(sql, [nombre, descripcion, ubicacion, habitantes, req.params.id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Reino no encontrado' });
            return;
        }
        res.json({ message: 'Reino actualizado correctamente' });
    });
});

// Delete
router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM reinos WHERE id = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Reino no encontrado' });
            return;
        }
        res.json({ message: 'Reino eliminado correctamente' });
    });
});

module.exports = router;