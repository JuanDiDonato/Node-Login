//Requires
const pool = require('../database/connection');
const {encryptPassword} = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');

const userControllers = {}
//Create token
userControllers.singToken = id_user =>{
     return jwt.sign({iss : process.env.ISS, sub : id_user}, process.env.ISS, {expiresIn: '3h'})
}
//Register new user
userControllers.register = async (req,res) => {
     const {name, surname, username, password, coin} = req.body;
     if(name && surname && username && password && coin){
          const checkUser = await pool.query('SELECT * FROM users WHERE username = ?', username);
          if(checkUser.length > 0)
               return res.status(422).json({error: true ,alert : 'Nombre de usuario no disponible.'});
          else{
               const hashedPassword = await encryptPassword(password);
               pool.query('INSERT INTO users SET ?',{name, surname, username, 'password':hashedPassword, coin});
               res.status(201).json({error:false, alert: 'Usuario creado con exito.'});
          };
     }else res.status(404).json({error:true,alert:'Complete todos los campos'})
     
};
//Login a user
userControllers.login = async (req,res) => {
     if(req.isAuthenticated()){
          const {id_user, name, surname, username, coin} = req.user;
          let token = userControllers.singToken(id_user);
          res.cookie('access_token', token, {httpOnly : true, sameSite : true})
          res.status(200).json({isAuthenticated: true, userData : {name,surname,username,coin}})
     }else{
          res.status(401).json()
     }

}

module.exports=userControllers

