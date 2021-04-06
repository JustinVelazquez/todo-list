const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

// Creating an instance of Express and calling other dependencies
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(helmet());
app.use(cors());

//MongoDb Connection
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(
  mongoURL,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  (err) => {
    if (!err) {
      console.log(`MongoDB Connection Successful`);
    } else
      (err) => {
        console.log(`Error in DB connection: ${err}`);
      };
  }
);

//Routes/API
app.get('/', async (req, res) => {
  res.json('hello World');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening in on port: ${PORT}`);
});
