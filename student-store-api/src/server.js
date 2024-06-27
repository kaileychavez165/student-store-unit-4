require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const productRoutes = require("../routes/productRoutes");
const orderRoutes = require("../routes/orderRoutes");
const orderItemRoutes = require("../routes/orderItemRoutes");

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/orderitems", orderItemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}!`);
});