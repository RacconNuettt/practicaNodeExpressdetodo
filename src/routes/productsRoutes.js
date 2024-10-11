const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getAllproductos);
router.post('/', productsController.createProduct);
router.delete('/:id', productsController.deleteProduct); 
router.put('/:id', productsController.updateProduct);

module.exports = router;
