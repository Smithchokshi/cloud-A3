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
    await connection.end();
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getAllProducts = async (req, res) => {
  try {

    const getQuery = 'SELECT * from products';

    const results = await readerConnection.query(getQuery);

    console.log(results);

    readerConnection.end();

    res.status(200).json({
      products: results.results
    });
  } catch (e) {
    console.log(e);
    readerConnection.end();
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};


module.exports = { addProducts, getAllProducts };
