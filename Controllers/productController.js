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
    await readerConnection.query("SELECT * from products", (err, rows) => {
      const updatedRows = rows.map(e => {
        return {
          name: e.name,
          price: e.price,
          availability: e.availability === 1
        }
      })
      res.status(200).json({
        products: updatedRows
      });
    });
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};






module.exports = { addProducts, getAllProducts };
