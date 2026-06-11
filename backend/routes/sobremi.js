const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.get('/', (req, res) => {
    const sql = "SELECT id, nombre, email, rol, DATE_FORMAT(fecha_registro, '%d/%m/%Y') AS fecha_registro, descripcion, imagen FROM usuarios WHERE id = 1";
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

module.exports = router;