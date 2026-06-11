const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Get all
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM personajes';
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
    const sql = 'SELECT * FROM personajes WHERE id = ?';
    connection.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Personaje no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Post
router.post('/', (req, res) => {
    const { nombre, descripcion, reino, categoria, arma_principal } = req.body;

    if (!nombre || !descripcion || !reino || !categoria) {
        if (!nombre) res.status(400).json({ error: 'Faltan campos: nombre' });
        if (!descripcion) res.status(400).json({ error: 'Faltan campos: descripcion' });
        if (!reino) res.status(400).json({ error: 'Faltan campos: reino' });
        if (!categoria) res.status(400).json({ error: 'Faltan campos: categoria' });
        return;
    }

    const sql = `INSERT INTO personajes (nombre, descripcion, reino, categoria, arma_principal) 
                 VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [nombre, descripcion, reino, categoria, arma_principal], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        res.json({ message: 'Personaje creado correctamente', id: result.insertId });
    });
});

// Put
router.put('/:id', (req, res) => {
    const { nombre, descripcion, reino, categoria, arma_principal } = req.body;

    if (!nombre || !descripcion || !reino || !categoria) {
        if (!nombre) res.status(400).json({ error: 'Faltan campos: nombre' });
        if (!descripcion) res.status(400).json({ error: 'Faltan campos: descripcion' });
        if (!reino) res.status(400).json({ error: 'Faltan campos: reino' });
        if (!categoria) res.status(400).json({ error: 'Faltan campos: categoria' });
        return;
    }

    const sql = `UPDATE personajes SET nombre = ?, descripcion = ?, reino = ?, categoria = ?, arma_principal = ? 
                 WHERE id = ?`;
    connection.query(sql, [nombre, descripcion, reino, categoria, arma_principal, req.params.id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Personaje no encontrado' });
            return;
        }
        res.json({ message: 'Personaje actualizado correctamente' });
    });
});

// Delete
router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM personajes WHERE id = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Personaje no encontrado' });
            return;
        }
        res.json({ message: 'Personaje eliminado correctamente' });
    });
});

module.exports = router;