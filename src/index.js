//Requires
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport')

//Settings
const app = express();
app.set('port', 3000);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(passport.initialize());

//Routes
app.use('/user', require('./routes/users_routes'))

//Init
app.listen(app.get('port'), () => {
     console.log(`[+] Servidor iniciado en el puerto ${app.get('port')}`);
})