'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const hadBooks = require ('./controller/book.controller');

const app = express();
app.use(cors());
// const bookModel = require ("./models/book.model");

const PORT = process.env.PORT || 3001;
const MONGO_SERVER =process.env.MONGO_DB_URL;

mongoose.connect(`${MONGO_SERVER}/Book`,{useNewUrlParser: true, useUnifiedTopology: true});
   
app.get('/test', (req, res) => {

  res.send('test request received')

})


app.get("/books",hadBooks)

// function bookHandler(req,res){
//     const{email}=req.query;
//     bookModel.find({email},(err,result)=>{
//         if (err){
//             res.status(404).send("there was an error")
//         }else{
//             res.send(result);
//         }
//     })
// }
app.listen(PORT, () => console.log(`listening on ${PORT}`));
