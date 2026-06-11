const express = require('express');
const router = express.Router();

const connection = require('../db/connection');

// Get all
router.get('/', (req, res) => {
    const sql = `
        SELECT a.*, p.nombre as personaje_nombre 
        FROM armas a
        LEFT JOIN personajes p ON a.personaje_id = p.id
    `;
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
    const sql = `SELECT * FROM armas WHERE id = ?`;
    connection.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Arma no encontrada' });
            return;
        }
        res.json(results[0]);
    });
});

// Post
router.post('/', (req, res) => {
    const { nombre, descripcion, personaje_id } = req.body;

    if(!nombre || !descripcion || !personaje_id){
        if(!nombre) res.status(400).json({error: 'Faltan campos: nombre'});
        if(!descripcion) res.status(400).json({error: 'Faltan campos: descripcion'});
        if(!personaje_id) res.status(400).json({error: 'Faltan campos: personaje_id'});
        return;
    }

    const sql = `INSERT INTO armas (nombre, descripcion, personaje_id) 
                 VALUES (?, ?, ?)`;
    connection.query(sql, [nombre, descripcion, personaje_id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        res.json({ message: 'Arma creada correctamente', id: result.insertId });
    });
});

// Put
router.put('/:id', (req, res) => {
    const { nombre, descripcion, personaje_id } = req.body;

    if(!nombre || !descripcion || !personaje_id){
        if(!nombre) res.status(400).json({error: 'Faltan campos: nombre'});
        if(!descripcion) res.status(400).json({error: 'Faltan campos: descripcion'});
        if(!personaje_id) res.status(400).json({error: 'Faltan campos: personaje_id'});
        return;
    }

    const sql = `UPDATE armas SET nombre = ?, descripcion = ?, personaje_id = ? WHERE id = ?`;
    connection.query(sql, [nombre, descripcion, personaje_id, req.params.id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Arma no encontrada' });
            return;
        }
        res.json({ message: 'Arma actualizada correctamente' });
    });
});

// Delete
router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM armas WHERE id = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Arma no encontrada' });
            return;
        }
        res.json({ message: 'Arma eliminada correctamente' });
    });
});

module.exports = router;
