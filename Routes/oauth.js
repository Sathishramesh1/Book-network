import express from 'express';
import    {OAuth2Client}   from 'google-auth-library'
import dotenv from 'dotenv'

dotenv.config();
    
const router=express.Router();



async function getUserData(access_token){
    const response=await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);

    const data=await response.json();
    console.log('data',data);
}


router.get('/',async(req,res)=>{
    const code=req.query.code;

    try {
        const redirectUri='https://book-network-3zpo.onrender.com/oauth';
        const clientId=process.env.CLIENT_ID;
    const clientSecret=process.env.CLIENT_SECRET;

    const oAuth2Client= new OAuth2Client({
       clientId,
        clientSecret,
        redirectUri
    });
    const res=await oAuth2Client.getToken(code);

    await oAuth2Client.setCredentials(res.tokens);
    console.log("token acquired");
    const user=oAuth2Client.credentials();
    console.log('creditionals',user);
    await getUserData(user.access_token);
        
    } catch (error) {
        console.log(error);
        
    }

})