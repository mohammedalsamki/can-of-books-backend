"use strict";

const { request } = require('express');
const bookModel=require('../models/book.model')


const getBooks=(req,res)=>{
    bookModel.find({email:req.params.email},(err,bookData)=>{
        res.json(bookData)
    })
}
const creatsBook =(req,res)=>{
    const { title, description, email, status }=req.body;

    const newBook= new bookModel({
        title,description,email,status
    });
    newBook.save();
    res.json(newBook);
}
const deleteBooks=(req,res)=>{
    const bookId= req.params.book_id;
    bookModel.deleteOne({_id:bookId},(err,deleteBooks)=>{
        if(err){alert(`you have err in backend`)
    }
    else{res.json(deleteBooks);}
    });
}

const updateBooks =(req,res)=>{
    const{title,description,email,status}=req.body;
    const bookId=req.params.book_id;
    bookModel.findByIdAndUpdate({_id:bookId},{title,des,email,status},{new:true},(err,updatebook)=>{
        res.json(updatebook);
    });
}

module.exports={
    getBooks,
    creatsBook,
    deleteBooks,
    updateBooks
}