const mongooseDB = require('mongoose');

const Schema = mongooseDB.Schema;

const keySchema = new Schema({
    
    newAccesKey : {
        type : String
    },
    ownerID : {
        name : String,
        lastName : String
    },
    expireAt: {
        type: Date,
        default: Date.now,
        createIndexes: { expires: '5m' }
    }

});


module.exports = mongooseDB.model("NewAccessKey", keySchema);