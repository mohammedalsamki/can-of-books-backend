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
// solve 

// mongoose.connect(`${MONGO_SERVER}/Book`,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect( 
  `mongodb+srv://sa2331996:sa2331996@cluster0.lqwfl.mongodb.net/Books?retryWrites=true&w=majority`, 
  { useNewUrlParser: true, useUnifiedTopology: true } );

  const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
   
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
