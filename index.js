const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const helmet = require('helmet');
const dotenv = require('dotenv');
const { static } = require('express');

dotenv.config();

//MongoDb Connection
let mongoURL = process.env.MONGODB_URL,
  db,
  dbName = 'todo';

MongoClient.connect(mongoURL, { useUnifiedTopology: true })
  .then((client) => {
    console.log(`Hey, connected to ${dbName} database`);
    db = client.db(dbName);
  })
  .catch((er) => {
    console.log(err);
  });

// Mongoose Connection Chain(when it was in use)
// (err) => {
//   if (!err) {
//     console.log(`MongoDB Connection Successful`);
//   } else
//     (err) => {
//       console.log(`Error in DB connection: ${err}`);
//     };
// }

// Creating an instance of Express and calling other dependencies
const app = express();

//EJS Templates
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(static('public'));

//Routes/API

//@desc Get our Tasks
//@route GET /
app.get('/', async (req, res) => {
  await db
    .collection('tasks')
    .find()
    .toArray()
    .then((data) => {
      res.render('index.ejs', { tasks: data });
      console.log(data);
    })
    .catch((error) => console.log(error));
});

//@desc Add A Task
//@route Post /addTask

app.post('/addTask', (req, res) => {
  db.collection('tasks')
    .insertOne({todo: req.body.todoItem, completed: false })
    .then((result) => {
      console.log('Todo has been added!');
      res.redirect('/');
    });
});

//@desc Delete a Task
//@route DELETE /deleteTask
app.delete('/deleteTask', async (req, res) => {
  await db
    .collection('tasks')
    .deleteOne({ todo: req.body.todo })
    .then((result) => {
      console.log('Deleted Task');
      res.json('Deleted It');
    })
    .catch((err) => console.log(err));
});

//@desc Mark Complete
//@route PUT /markComplete
app.put('/markComplete', async (req, res) => {
  await db
    .collection('tasks')
    .updateOne(
      { todo: req.body.todo },
      {
        $set: {
          completed: true,
        },
      }
    )
    .then((result) => {
      console.log('Marked Complete');
      res.json('Marked Complete');
    });
});

// Port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening in on port: ${PORT}`);
});
