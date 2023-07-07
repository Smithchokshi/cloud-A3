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

const getAllProducts = (req, res) => {
  try {
    // const getQuery = 'SELECT * FROM products';
    // console.log(getQuery,">>>>>>>>>");
    // const results = await readerConnection.query("SELECT * from products");
    // console.log('rows', results);
    readerConnection.query('SELECT * FROM products', function (err, rows) {
      if (err) {
        console.log('error', err)
      } else {
        console.log('profile', rows )
        res.status(200).json({
          products: rows.profile
        });
      }
    })
    // res.status(200).json({
    //   products: results
    // });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};






module.exports = { addProducts, getAllProducts };
