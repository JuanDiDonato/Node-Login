//Requires
const {Router} = require('express');
const passport = require('passport');
require('../passport');
const {register, login} = require('../controllers/users');

const userRoute = Router();
//POST REQUEST
//Register new user
userRoute.post('/register', register);
//Login a user
userRoute.post('/login', passport.authenticate('local', {session:false}), login);

module.exports=userRoute
