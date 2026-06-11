const express = require('express');
const connection = require('../db/connection');
const router = express.Router();

// Get all
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM enemigos';
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
    const sql = 'SELECT * FROM enemigos WHERE id = ?';
    connection.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Enemigo no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Post
router.post('/', (req, res) => {
    const { nombre, descripcion, categoria, debilidad } = req.body;

    if(!nombre || !descripcion || !categoria){
        if(!nombre) res.status(400).json({error: 'Faltan campos: nombre'});
        if(!descripcion) res.status(400).json({error: 'Faltan campos: descripcion'});
        if(!categoria) res.status(400).json({error: 'Faltan campos: categoria'});
        return;
    }

    const sql = `INSERT INTO enemigos (nombre, descripcion, categoria, debilidad) 
                 VALUES (?, ?, ?, ?)`;
    connection.query(sql, [nombre, descripcion, categoria, debilidad], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error al crear enemigo' });
            return;
        }
        res.status(201).json({ id: result.insertId, message: 'Enemigo creado' });
    });
});

// Put
router.put('/:id', (req, res) => {
    const { nombre, descripcion, categoria, debilidad } = req.body;

    if(!nombre || !descripcion || !categoria){
        if(!nombre) res.status(400).json({error: 'Faltan campos: nombre'});
        if(!descripcion) res.status(400).json({error: 'Faltan campos: descripcion'});
        if(!categoria) res.status(400).json({error: 'Faltan campos: categoria'});
        return;
    }

    const sql = `UPDATE enemigos SET nombre = ?, descripcion = ?, categoria = ?, debilidad = ? WHERE id = ?`;
    connection.query(sql, [nombre, descripcion, categoria, debilidad, req.params.id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Enemigo no encontrado' });
            return;
        }
        res.json({ message: 'Enemigo actualizado correctamente' });
    });
});

// Delete
router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM enemigos WHERE id = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Enemigo no encontrado' });
            return;
        }
        res.json({ message: 'Enemigo eliminado correctamente' });
    });
});

module.exports = router;