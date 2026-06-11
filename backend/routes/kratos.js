const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Datos de Kratos
router.get('/', (req, res) => {
    connection.query('SELECT * FROM personajes WHERE id = 1', (err, results) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Kratos no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Armas de Kratos
router.get('/armas', (req, res) => {
    connection.query('SELECT * FROM armas WHERE personaje_id = 1', (err, results) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        res.json(results);
    });
});

// Objetos de Kratos
router.get('/objetos', (req, res) => {
    const sql = `SELECT o.* FROM objetos o
                 JOIN objetos_usados ou ON o.id = ou.objeto_id
                 WHERE ou.personaje_id = 1`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;