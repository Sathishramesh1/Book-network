import express from 'express'
import {addBook, favbook, getAllbooks, getfav, login} from '../controllers/BookController.js'


const router=express.Router();


//route for registering  book
router.route('/register').post(addBook);


router.route('/login').post(login);



router.route('/favorites').post(favbook);


//get all books
router.route('/getall').get(getAllbooks)


//for users
router.route('/getfav').get(getfav);



export {router}