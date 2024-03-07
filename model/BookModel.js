import mongoose from "mongoose";


//book schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    required: true,
    unique: true
  },
  author: String,
  description: String,
  
});


//book model
const Book = mongoose.model('Book', bookSchema);


export {Book}
