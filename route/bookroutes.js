import express from 'express'
import {addBook, login} from '../controllers/BookController.js'


const router=express.Router();


//route for registering  book
router.route('/register').post(addBook);


router.route('/login').post(login);



export {router}