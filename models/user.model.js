"use strict";

const mongoose = require(`mongoose`);
const bookSchema = require('./book.model')

const userSchema = new mongoose.Schema({
    myemail:  String ,
    books: [bookSchema]
});

const userModel = mongoose.model('users', userSchema);

let seedUser = () => {

    let bookslist = [
        {
            title: "Mr Robot",
            description: "softwar engeneerin who has a bad side with hacking ",
            status: "available"

        },
        {
            title: "Game Of Throuns ",
            description: "one of the best storys at all",
            status: "notavailable"


        },
        {
            title: "Braking bad ",
            description: "a chemist teacher who becam a drug deailer ",
            status: "notavailable"


        },
        {
            title: "Action",
            description: "have a lot of the most exited storys",
            status: "available"

        },
    ]
    let newusers = new userModel({
        myemail: "mohammed@samki.com",
        books: bookslist
    })
    newusers.save()
    console.log(newusers)
}


module.exports = { userModel, seedUser };















