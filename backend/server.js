import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB Connected');
}).catch((error) => {
    console.log(error.message);
}); 



const app = express();


app.get('/', (req, res) => {
    res.send(`<h1 style="text-align: center; background-color: powderblue">Server at http://localhost:${port}</h1>`);
});

app.get('/api/products', (req, res) => (
    res.send(data.products))
);

app.get('/api/product/:slug', (req, res) => {
    const product = data.products.find((x) => (x.slug === req.params.slug));
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found.' });
    }
  
});

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => (x._id === req.params.id));
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Cart Item Not Found.' });
    }
  
});


// app.get('/api/test', (req, res) => {
//     const heading = `<h1>Hello World</h1>`;
//     res.send(heading);
// });

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
    console.log(`Server at http://localhost:${port}`);
});