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

        const { email, given_name } = req.body;

        // Find user by email
        let user = await User.findOne({ email: email });

        // If user doesn't exist, create a new user
        if (!user) {
            user = await User.create({ email:email, username:given_name });
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



//get fav

const getfav=async(req,res)=>{
    try {
        const  email  = req.query.query;

// Find the user by their email
console.log(email);
const user = await User.findOne({ email });
console.log(user)

if (!user) {
    return res.status(404).send("User not found");
}

// Check if the user has any favorite books
if (!user.books || user.books.length === 0) {
    return res.status(404).send("No favorite books found for this user");
}

// Retrieve the user's favorite books and send them in the response
const favoriteBooks = await Book.find({ _id: { $in: user.books } },'_id title author ISBN description');

return res.status(200).json({ message: favoriteBooks });

        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
        
    }
}

export {getfav}



//get all books


const getAllbooks=async(req,res)=>{
    try {
        const book =await Book.find()

        return res.status(200).json({message:book});

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
        
    }
}

export {getAllbooks}



//search user api
const searchUser = async (req, res) => {
    try {
      // Extract the search query from the request
      const query=req.query.query
  
      // Search for users whose username or email matches the query
      const users = await User.find({
        $or: [
          { username: { $regex: query, $options: 'i' } }, 
          { email: { $regex: query, $options: 'i' } } // Case-insensitive email search
        ]
      }).populate('books'); // Populate the 'books' field to retrieve the associated books
  
      // If no users match the query, return a 404 response
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found matching the query.' });
      }
  
      // Prepare the response data with user information and their associated books
      const userData = users.map(user => ({
        username: user.username,
        email: user.email,
        books: user.books.map(book => ({
          title: book.title,
          author: book.author,
          ISBN: book.ISBN,
          description: book.description
        }))
      }));
  
      // Send the response with the user data
      res.status(200).json({ users: userData });
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  
  export { searchUser };