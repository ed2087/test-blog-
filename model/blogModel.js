const mongooseDB = require('mongoose');

const Schema = mongooseDB.Schema;

const blogSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },    
    createDate:{
        type:Date,
        default: Date.now
    },
    author:{
        name : {
            type:String,
            required: true
        },
        id : {
            type:String,
            required: true
        }
    },
    backgroundColor:{
        type:String,
        required: true
    }

});

module.exports = mongooseDB.model("BlogData", blogSchema);


