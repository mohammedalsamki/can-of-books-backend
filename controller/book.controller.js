"use strict";

const { request } = require('express');
const bookModel=require('../models/book.model')


// const getBooks=(req,res)=>{
//     bookModel.find({email:req.params.email},(err,bookData)=>{
//         res.json(bookData)
//     })
// }
// const creatsBook =(req,res)=>{
//     const bookData=req.body;

//     const newBook= new bookModel(bookData);
//     newBook.save();
//     res.json(newBook);
// }
// const deleteBooks=(req,res)=>{
//     const bookId= req.params.id;
//     bookModel.findByIdAndDelete({_id:bookId},(err,deleteBooks)=>{
//         if(err){
//             console.log('aletr error')
//     }
//     else{res.json(deleteBooks);}
//     });
// }

// const updateBooks =(req,res)=>{
//     const{title,description,email,status}=req.body;
//     const bookId=req.params.book_id;
//     bookModel.findByIdAndUpdate({_id:bookId},{title,des,email,status},{new:true},(err,updatebook)=>{
//         res.json(updatebook);
//     });
// }
// Retrieve
const getBooks=(req,res)=>{
    // Query parameters
    bookModel.find().then(data=>{
        res.status(200).json(data)
    });
}

const creatsBook=(req,res)=>{
    // Body
    // this will be a json object that contains username and email
    let bookData=req.body;
    let newBook= new bookModel(bookData);
    newBook.save();
    bookModel.find({}).then(data=>{res.status(200).json(data)});
}
const deleteBooks=(req,res)=>{
    // PARAMS
    let bookId=req.params.id;
    bookModel.findByIdAndDelete(bookId).then(()=>{
        bookModel.find().then(data=>res.json(data));
    });

}

const updateBooks=async (req,res)=>{
    let bookId=req.params.id;
    let updatedData=req.body;
    bookModel.findOne({_id:bookId}).then(book=>{
        book.title=updatedData.title;
        book.description=updatedData.description;
        book.status=updatedData.status;
        book.email=updatedData.email;
        book.save();
    });
    let updatedBooksList=await bookModel.find({});
    res.status(200).send(updatedBooksList);
}

module.exports={
    getBooks,
    creatsBook,
    deleteBooks,
    updateBooks
}