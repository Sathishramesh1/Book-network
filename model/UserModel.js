import mongoose from "mongoose";


//schema for users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});


//model for users
const User = mongoose.model('User', userSchema);

export {User}
