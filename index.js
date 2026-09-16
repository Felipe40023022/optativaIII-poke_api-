const express = require('express');
const path = require('path');
const pokemonRoutes = require('./routes/pokemon.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servir la interfaz web desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas base
app.use('/api/pokemon', pokemonRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de la API ejecutándose en http://localhost:${PORT}`);
});