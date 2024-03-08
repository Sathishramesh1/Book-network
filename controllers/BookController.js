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



//adding fav book


const favbook=async(req,res)=>{

    try {
        const { _id, email } = req.body;

        // Find the book by its ID
        const book = await Book.findById(_id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Find the user by their email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the book already exists in the user's favorites
        if (user.books.includes(_id)) {
            return res.status(400).json({ error: 'Book already in favorites' });
        }

        // Add the book's ID to the user's favorites
        user.books.push(_id);
        await user.save();

        return res.status(200).json({ status: 'success', message: 'Book added to favorites successfully' });
         
       
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
        
        
    }
}

export {favbook}