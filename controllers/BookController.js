import { Book } from "../model/BookModel.js";
import {User} from '../model/UserModel.js'



 const addBook=async(req,res)=>{
    const {title, author,ISBN,description}=req.body;

try {
   const newBook=await Book.find({ISBN:ISBN});

   if(!newBook){

    return res.status(409).send("Already exits");
   }

   const addnewBook= await new Book({ ...req.body }).save();
    
  return  res.status(201).json({
       status:'success',
       message:"Book added successfully"
   })


    
} catch (error) {

    console.log(error);
    return res.status(500).send(error);
    
}

}

export {addBook}



//login

const login=async(req,res)=>{

    try {

        const {email,given_name}=req.body;

        const user=await User.find({email:email});

       // If user doesn't exist, create a new user
       if (!user) {
        user = await User.create({ email, given_name });
        return res.status(201).json({
            status: 'success',
            message: 'New user created',
            user: user
        });
    }

    // Handle login logic for existing user...
    return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        user: user
    });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
        
    }
}

export {login}