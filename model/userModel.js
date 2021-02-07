const mongooseDB = require('mongoose');

const Schema = mongooseDB.Schema;

const userSchema = new Schema({

    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    authority : String

});

// userSchema.methods.xxx = function(){
//     
// }


module.exports = mongooseDB.model("UserData", userSchema);



//superUser leves
//admin -- full access
//manager -- review access
//user -- website access