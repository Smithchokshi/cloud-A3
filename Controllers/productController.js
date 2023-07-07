const connection = require('../config/config');

const addProducts = async (req, res) => {
  try {
    const { products } = req.body;

    const addQuery = 'INSERT INTO products SET ?';

    console.log("products", products);

    await Promise.all(products.map(async (e) => {
      console.log(e);
      await connection.query(addQuery, e);
      console.log('Data added');
    }));


    await connection.end();

    res.status(200).json({
      message: "Success.",
    });
  } catch (e) {
    await connection.end();
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getAllProducts = async (req, res) => {
  try {

    const getQuery = 'SELECT * FROM products';

    const results = connection.query(getQuery);

    res.status(200).json({
      products: results
    });
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};


module.exports = { addProducts, getAllProducts };
