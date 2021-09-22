const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URL);

const bookModel = require('./models/book.model');

async function clear() {
  try {
    await bookModel.deleteMany({});
    console.log('Books cleared');
  } catch (error) {
    console.error(error);
  } 
  // finally {
  //   mongoose.disconnect();
  // }
}

clear();