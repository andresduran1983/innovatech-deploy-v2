const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_NAME || 'innovatech_db',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado exitosamente a la base de datos MySQL');
});

// 1. Obtener todos los productos
app.get('/api/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM productos WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(result[0]);
    });
});

// 3. Crear nuevo producto (Guarda Nombre, Descripción, Precio y Stock)
app.post('/api/productos', (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    db.query('INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)', 
    [nombre, descripcion, precio, stock], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, nombre, descripcion, precio, stock });
    });
});

// 4. Actualizar producto existente
app.put('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;
    db.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?', 
    [nombre, descripcion, precio, stock, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Producto actualizado correctamente' });
    });
});

// 5. Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Producto eliminado correctamente' });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});