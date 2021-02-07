const bcrypt = require('bcrypt');

// hash password function
const hashIt = async password =>{

    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;

}


//compare the password user entered with hashed pass.
const compareIt = async (password, hashedPassword) => {

    const match = await bcrypt.compare(password, hashedPassword);
    return match;

} 



const randomKey = async () => {

    let ar = [
        "a","b","%","@","$","1","6","g","*","+","&","p","!"
    ];

    const random = () => Math.floor(Math.random() * ar.length);
    let key = 0;
    
    for (let i = 0; i < ar.length; i++) {
        
        key += await random() + ar[random()];
        
    }

    return key;

}

module.exports = {
     hashIt, compareIt, randomKey
}