const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.post('/', (req, res) => {
    const { email, password } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'El email es obligatorio' });
    }
    
    if (!password) {
        return res.status(400).json({ error: 'La contraseña es obligatoria' });
    }
    
    // Buscar usuario por email
    const sqlSelect = 'SELECT id, nombre, email, rol, password FROM usuarios WHERE email = ?';
    connection.query(sqlSelect, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        
        // Si el usuario no existe, lo creamos
        if (results.length === 0) {
            const nombrePorDefecto = email.split('@')[0];
            
            const sqlInsert = `INSERT INTO usuarios (nombre, email, password, rol, fecha_registro) 
                               VALUES (?, ?, ?, 'user', NOW())`;
            connection.query(sqlInsert, [nombrePorDefecto, email, password], (err, result) => {
                if (err) return res.status(500).json({ error: 'Error al crear usuario' });
                
                const nuevoUsuario = {
                    id: result.insertId,
                    nombre: nombrePorDefecto,
                    email: email,
                    rol: 'user'
                };
                const puedeEditar = nuevoUsuario.rol === 'admin' || nuevoUsuario.rol === 'desarrollador';
                
                res.json({
                    message: 'Usuario creado correctamente',
                    usuario: nuevoUsuario,
                    puedeEditar: puedeEditar,
                    esNuevo: true
                });
            });
        } else {
            // Usuario existe - validar contraseña
            const usuario = results[0];
            
            if (usuario.password !== password) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
            
            const puedeEditar = usuario.rol === 'admin' || usuario.rol === 'desarrollador';
            
            delete usuario.password;
            
            res.json({
                message: 'Login exitoso',
                usuario: usuario,
                puedeEditar: puedeEditar,
                esNuevo: false
            });
        }
    });
});

module.exports = router;