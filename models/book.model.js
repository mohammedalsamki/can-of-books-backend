"use strict";

const mongoose = require ('mongoose');

const bookSchema = new mongoose.Schema({
    title :String,
    description : String,
    status: String,
    email:{type:String},
    
});
const bookModel = mongoose.model("Book", bookSchema);


module.exports=bookModel;
