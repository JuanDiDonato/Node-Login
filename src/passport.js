//Requires 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const {comparePassword} = require('./helpers/bcrypt');
const pool = require('./database/connection')

//Get cookie
const getCookie = req => {
     let token = null
     if(req && req.cookies) token = req.cookies['access_token'];
     return token
}

//LocalStrategy
passport.use(new LocalStrategy({
     usernameField : 'username',
     passwordField : 'password',
}, async (username,password, done) => {
     const row = await pool.query('SELECT * FROM users WHERE username = ?', username);
     if(row.length === 0) return done(error, false);
     else{
          let message  = 'Ingreso exitoso'
          const user = row[0];
          const dbPassword = user.password;
          const checkPassword = await comparePassword(password, dbPassword);
          if(checkPassword){
               return done(null, user, message)
          }else{
               return done(error, false, message = 'Error');
          } 
          
     }
}))
console.log(process.env);
//JwtStrategy
passport.use(new JwtStrategy({
     jwtFromRequest : getCookie,
     secretOrKey : process.env.ISS
}, (payload, done) => {
     pool.query('SELECT * FROM users WHERE id_user = ?', [payload.sub], (error, user) => {
          if(error) return done(error,false);
          if(user) return done(null, user);
          else return done(null, false)
     })
}))