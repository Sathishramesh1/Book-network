import express from 'express'
import {addBook, favbook, login} from '../controllers/BookController.js'


const router=express.Router();


//route for registering  book
router.route('/register').post(addBook);


router.route('/login').post(login);



router.route('/favorites').post(favbook);



export {router}