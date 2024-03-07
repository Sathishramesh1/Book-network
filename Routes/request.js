import express from 'express';
import    {OAuth2Client}   from 'google-auth-library'
import dotenv from 'dotenv'

dotenv.config();
    
const router=express.Router();



router.post("/",async(req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:5173');
    req.header('Referrer-Policy','no-referrer-when-downgrade');


    const redirectUri='https://book-network-3zpo.onrender.com/oauth';


    const clientId=process.env.CLIENT_ID;
    const clientSecret=process.env.CLIENT_SECRET;

    const oAuth2Client= new OAuth2Client({
       clientId,
        clientSecret,
        redirectUri
    });

    const authorizeUrl=oAuth2Client.generateAuthUrl({
        access_type:'offline',
        scope:'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt:'consent',

    });

    res.json({url:authorizeUrl});





})