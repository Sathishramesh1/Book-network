import express from 'express'
import {addBook, favbook, getfav, login} from '../controllers/BookController.js'


const router=express.Router();


//route for registering  book
router.route('/register').post(addBook);


router.route('/login').post(login);



router.route('/favorites').post(favbook);


router.route('/getfav').get(getfav);



export {router}