const express = require('express');
const app = express();
const router = require('./api');
const {connect, executeQuery} = require('./database.js');
const body_parser = require('body-parser');
const cors = require('cors');

app.use(router);
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended : true}))


app.use(cors());

connect().then((connection)=>{
    console.log('connected to database');
}).catch((error)=>{
    console.log('failed on ' , error);    
})

const port = process.env.PORT || 5000

app.listen(port,()=>{console.log('app run on port 5000')})

module.exports = app


