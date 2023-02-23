
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import apiRoute from './routes/api/index.js';
import mongoose from 'mongoose';
const app = express();
export default class application {

  constructor(){
    this.setUpExpress();
    this.setUpMongoose();
    this.setConfig();
    this.setRoutes();
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
  setConfig(){
    app.use(cors());
    app.use('/static',express.static('public'));
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.use(cookieParser());
  }
  setRoutes(){
    app.use('/api',apiRoute);
  }
  
}