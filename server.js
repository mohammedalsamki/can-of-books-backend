'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { req, res } = require('express');
const bookModel = require('./models/book.model');
const jwt = require('jsonwebtoken');
const getToken = require('./getToken');


const PORT = process.env.PORT || 1177;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_DB_URL);

const PORT = process.env.PORT || 3001;
const MONGO_SERVER =process.env.MONGO_DB_URL;
// solve 


const databaseCheck = mongoose.connection;
databaseCheck.on('database error', console.error.bind(console, 'connection fail'));
databaseCheck.once('database open', _ => {
  databaseCheck.log('connected on database');
});


app.get('/books', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getToken, {}, async function (error, user) {
    if (error) {
      res.send('invalid token');
    } else {
      const filterQueryOBj = {};
      filterQueryOBj.email = req.query.email;
      const books = await bookModel.find(filterQueryOBj);
      res.send(books);
      // TODO: add another error catch?
    }
  });
});

app.post('/books', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getToken, {}, async function (error, user) {
    if (error) {
      res.send('invalid token');
    } else {
      try {
        const newBooks = await bookModel.create(req.body);
        res.status(201).send(newBooks);
      } catch (error) {
        console.error.apply(error);
        res.status(500).send('server error')
      }
    }
  });
});

app.put('/books/:id', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getToken, {}, async function (error, user) {
    if (error) {
      res.send('invalid token');
    } else {
      try {
        const id = req.params.id;
        const updatedBooks = await bookModel.findByIdAndUpdate(id, req.body, { new: true });
        res.send(updatedBooks);
      } catch (error) {
        console.error(error);
        res.status(400).send(`unable to update book ${id}`);
      }
    }
  })
});



app.delete('/books/:id', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getToken, {}, async function (error, user) {
    if (error) {
      res.send('invalid token');
    } else {
      try {
        await bookModel.findByIdAndDelete(req.params.id);
        res.status(204).send('success')
      } catch (error) {
        console.error.apply(error);
        res.status(500).send('server error')
      }
    }
  })
});

app.get('/test', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, getToken, {}, function (err, user) {
    if (err) {
      res.send('invalid token');
    } else {
      res.send(user);
    }
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
