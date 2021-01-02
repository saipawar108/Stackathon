const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeerouter = require('./routes/Employee');
const requestrouter = require('./routes/Request');
const teamRouter = require('./routes/team')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database linked successfully!');
})

app.use('/team', teamRouter)
app.use('/employee',employeerouter);
app.use('/request',requestrouter);

app.listen(port,()=>{
  console.log("Server is running at port : " , port);
})