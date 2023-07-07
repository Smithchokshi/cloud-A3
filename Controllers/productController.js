const { writerConnection, readerConnection } = require('../config/config');

const addProducts = async (req, res) => {
  try {
    const { products } = req.body;

    const addQuery = 'INSERT INTO products SET ?';

    console.log("products", products);

    await Promise.all(products.map(async (e) => {
      console.log(e);
      await writerConnection.query(addQuery, e);
      console.log('Data added');
    }));


    await writerConnection.end();

    res.status(200).json({
      message: "Success.",
    });
  } catch (e) {
    await writerConnection.end();
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const getQuery = 'SELECT * FROM products';
    console.log(getQuery,">>>>>>>>>");
    const rows = await readerConnection.query(getQuery);
    console.log(rows,"rows>>>>>>>>>>");
    const products = [];

    for (let i = 0; i < rows.length; i++) {
      products.push(rows[i]);
    }

    console.log(products);

    res.status(200).json({
      products: products
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};






module.exports = { addProducts, getAllProducts };
