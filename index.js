import 'dotenv/config';
import express from 'express';
import retrieve from './retrieval.js';
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());
app.post('/api/generate',(req,res,next)=>{
    retrieve(req,res);
})
app.get('/',(req,res,next)=>{
    res.json({message:'Server is up and running'});
})
app.listen(8080, ()=>{
    console.log('Server is running on Port 8080');
})