import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose';
import productRoutes from './routes/ProductRoutes.js';
import { errHandler } from './middlewares/error.js';

const app = express();

app.use(express.json())

const dbString = process.env.MONGO_URI;


mongoose
  .connect(dbString, {
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection completed');
  })
  .catch((e) => console.log(e));

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use('/api/products',productRoutes)

app.all('*', (req, res, next) => {
  next(new Error(`Cannot find route ${req.originalUrl} in the server`));
});

app.use(errHandler)

app.listen(5000,()=>{
    console.log("Server Started")
})
