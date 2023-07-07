const express = require('express');
const { addProducts, getAllProducts } = require('../Controllers/productController');

const router = express.Router();

router.post('/store-products', addProducts);
router.post('/list-products', getAllProducts);

router.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

module.exports = router;