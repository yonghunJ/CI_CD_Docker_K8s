import express, { application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

const port = 4200;

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_URL } = process.env;
// const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
const url = DB_URL as string;
console.log(url)
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  // If not connected, return errors immediately rather than waiting for reconnect
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

// Create the database connection
mongoose
  .connect(url, options)
  .then(() => {
    console.log('Mongoose connection done');
  })
  .catch((e) => {
    console.log('Mongoose connection error');
    console.error(e);
  });
app.get('/:id', (req, res, next) => {
  console.log(req.params.id)
  return res.send(`hello${req.params.id}`);
})
app
  .listen(port, () => {
    console.log(`server running on port : ${port}`);
  })
  .on('error', (e) => console.error(e));

export default app;
