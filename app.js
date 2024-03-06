const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database.js');
dotenv.config();

const app = express();
app.use(cors());


app.get('/', (req,res) =>{
  res.json({
    mesaj:"deneme 1"
  })
})




const PORT = process.env.PORT || 5000;

db();


app.listen(PORT,()=> {
  console.log("server calıştı: http://localhost:5000/");
})