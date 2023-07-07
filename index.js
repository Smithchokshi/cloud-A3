const express = require('express');
const cors = require('cors');
const http = require('http');
const productsRoute = require('./Routes/productRoute');

const app = express();
const server = http.createServer(app);
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/', productsRoute);

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
  console.log('Server is running', PORT);
});
