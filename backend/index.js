import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { RootRouterV1 } from './routes/index.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
import { createAdmin } from './scripts/createAdmin.js';


app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the API!');
});

app.use('/api/v1', RootRouterV1);

app.use((req, res) => {
    res.status(404).send({
        status: 'fail',
        message: 'Route not found',
    });
});


mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log('Database connected successfully');
        createAdmin();
    })
    .catch(err => console.log(err));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});