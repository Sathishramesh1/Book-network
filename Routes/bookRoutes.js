import express from 'express'
import {addBook} from '../controllers/BookController.js'


const router=express.Router();


//route for registering  book
router.route('/register').post(addBook);




export {router}