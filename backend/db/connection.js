const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
    user: process.env.DB_USER || '4EXE3CMe7DmXkT6.root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'godofapi',
    port: process.env.DB_PORT || 4000,
    ssl: {
        rejectUnauthorized: false  // Solo para pruebas, no recomendado en producción
    }
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a MySQL:', err);
        return;
    }
    console.log('✅ Conectado a MySQL (TiDB Cloud)');
});

module.exports = connection;