"use strict";

const { req, res } = require('express');
const { model } = require('mongoose');
const { userModel, seedUser} = require('../models/user.model');

// const hadBooks = (req, res) => {
//     const {email}  = req.query;
//     console.log(req.query.email, "hellow")
//     console.log(userModel);

//     userModel.find({ myemail: email }, (error, users) => {
//         if (error) {
//             res.send(error)
//         } else {
//             res.json(users)
//         }
//     });

// }
console.log(userModel)
// seedUser();
let hadBooks = (req, res) => {
    userModel.find().then(data => {
        res.json(data);
    })
}
module.exports = hadBooks;