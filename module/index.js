
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';
const app = express();
export default class application {

  constructor(){
    this.setUpExpress();
    this.setUpMongoose();
  }
  setUpExpress(){
    const server=http.createServer(app);
    server.listen(process.env.PORT,()=>console.log(`Server listening at ${process.env.PORT} `));
  }
  setUpMongoose(){
    
    mongoose.set('strictQuery',false);
    mongoose.connect(process.env.DATABASE_URI)
    .then(()=>console.log('Connected to db!'))
    .catch(()=>console.log('Error connecting to db!'));
  }
}