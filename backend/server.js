const express = require('express');
const cors = require('cors');

const path = require('path');

const personajeRoutes = require('./routes/personajes');
const reinoRoutes = require('./routes/reinos');
const armaRoutes = require('./routes/armas');
const enemigoRoutes = require('./routes/enemigos');
const objetoRoutes = require('./routes/objetos');
const kratosRoutes = require('./routes/kratos');
const sobremiRoutes = require('./routes/sobremi');
const loginRoutes = require('./routes/login');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../src')));

app.use('/api/personajes', personajeRoutes);
app.use('/api/reinos', reinoRoutes);
app.use('/api/armas', armaRoutes);
app.use('/api/enemigos', enemigoRoutes);
app.use('/api/objetos', objetoRoutes);
app.use('/api/kratos', kratosRoutes);
app.use('/api/sobremi', sobremiRoutes);
app.use('/api/login', loginRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📌 Endpoints disponibles:`);
    console.log(`   - GET  http://localhost:${PORT}/api/personajes`);
    console.log(`   - GET  http://localhost:${PORT}/api/reinos`);
    console.log(`   - GET  http://localhost:${PORT}/api/armas`);
    console.log(`   - GET  http://localhost:${PORT}/api/enemigos`);
    console.log(`   - GET  http://localhost:${PORT}/api/objetos`);
    console.log(`   - GET  http://localhost:${PORT}/api/kratos`);
    console.log(`   - GET  http://localhost:${PORT}/api/sobremi`);
});