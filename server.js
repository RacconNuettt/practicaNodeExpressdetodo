const express = require('express');
const cors = require('cors');
const app = express();
const productosRoute = require("./src/routes/productsRoutes");

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productosRoute);

app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});
