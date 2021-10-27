//Requires
const bcrypt = require('bcrypt');

const bcryptTools = {}
bcryptTools.encryptPassword = async (password) => {
     const salt = await bcrypt.genSalt(12);
     const hash = await bcrypt.hash(password, salt);
     return hash
}
bcryptTools.comparePassword = async (password, dbPassword) => {
     try {
          return await bcrypt.compare(password, dbPassword);
     } catch (error) {
          console.log(`[-] ${error}`);
     }
}
module.exports=bcryptTools