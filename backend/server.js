import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import cors from 'cors'; 

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB Connected');
}).catch((error) => {
    console.log(error.message);
}); 



const app = express();

app.use(cors());

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);


app.get('/', (req, res) => {
    res.send(`<h1 style="text-align: center; background-color: powderblue">Server at http://localhost:${port}</h1>`);
});




app.get('/api/test', (req, res) => {
    const heading = `<h1>Hello World</h1>`;
    res.send(heading);
});

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
    console.log(`Server at http://localhost:${port}`);
});