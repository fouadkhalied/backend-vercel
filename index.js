const express = require('express');
const app = express();
const router = require('./api');

app.use(router);
app.use(express.json());


const port = process.env.PORT || 5000

app.listen(port,()=>{console.log('app run on port 5000')})

module.exports = app


