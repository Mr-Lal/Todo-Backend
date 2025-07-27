import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import todoRoutes from './routes/todo.route.js';
import bodyParser from 'body-parser';



const app=express();
app.use(cors({
  origin: ['http://localhost:5173',''],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
// app.use(bodyParser())

connectDB();

app.use('/user', userRoutes);
app.use('/todo',todoRoutes)


app.get('/',(req,res)=>{
    res.send('Hello World')
})



export default app;