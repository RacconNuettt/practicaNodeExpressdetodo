const fs = require('fs').promises;

const getAllproductos = async (req, res) => {
    try {
        const data = await fs.readFile('datos.json', 'utf8');
        console.log('contenido del archivo:', data);
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos', error: error.message });
    }
};


const createProduct = async (req, res) => { 
    const { nombre, cantidad, price, description } = req.body;

    try {
        let productos;

        try {
            const data = await fs.readFile('datos.json', 'utf8');
            productos = JSON.parse(data);
            if (!Array.isArray(productos)) {
                return res.status(500).json({ message: 'Formato de datos incorrecto en datos.json' });
            }

        } catch (error) {
            productos = [];
        }

        const newProducto = {
            id: (productos.length + 1).toString(),
            nombre,
            cantidad,
            price,
            description,
        };

        productos.push(newProducto);

        const jsonData = JSON.stringify(productos, null, 2);

        await fs.writeFile('datos.json', jsonData);

        res.status(201).json(newProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fs.readFile('data.json', 'utf8');
        let productos = JSON.parse(data);

        const index = productos.findIndex(prod => prod.id === id);
        if (index === -1) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        productos.splice(index, 1);
        await fs.writeFile('data.json', JSON.stringify(productos, null, 2));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};



module.exports = {
    getAllproductos,
    createProduct,
    deleteProduct
}
