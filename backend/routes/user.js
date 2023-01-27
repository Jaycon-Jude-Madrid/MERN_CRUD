const express = require('express');

const router = express.Router();

//Controller Functions
const {loginUser,signUser} = require('../controllers/userController');



//Login Router
router.post('/login',loginUser)


//Signup Route
router.post('/signup',signUser)





module.exports = router