import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dbConnection } from './config/dbconnection';


//configuration .env files
dotenv.config();


//assign app to express
const app=express();



//handling cors errors
app.use(cors());


//database connection
dbConnection();

const PORT=process.env.PORT;


//testing request
app.get("/",(req,res)=>{
    
    return res.status(200).send("The book network api working ");
});


//listening  to the port
app.listen(PORT,()=>{
    console.log("server running on ",PORT);  
})