import { Book } from "../model/BookModel";

 const addBook=async(req,res)=>{
    const {title, author,ISBN,description}=req.body;

try {
   const newBook=await Book.find({ISBN:ISBN});

   if(newBook){

    return res.status(404).send("Already exits");
   }

   const addnewBook= await new Book({ ...req.body }).save();
    
   res.status(201).json({
       status:'success',
       message:"Book added successfully"
   })


    
} catch (error) {

    console.log(error);
    return res.status(500).send(error);
    
}

}

export {addBook}