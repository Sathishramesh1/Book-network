import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dbConnection } from './config/dbconnection.js';
import authRoutes from './Routes/authRoutes.js';
import passport from './passport.js'; // Import your Passport configuration

//configuration .env files
dotenv.config();


//assign app to express
const app=express();



//handling cors errors
app.use(cors());

app.use(express.json());


//database connection
dbConnection();

// Initialize Passport middleware

app.use(passport.initialize());


// Define routes
app.use('/', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});



const PORT=process.env.PORT;






//listening  to the port
app.listen(PORT,()=>{
    console.log("server running on ",PORT);  
})