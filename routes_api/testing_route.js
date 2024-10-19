const express = require('express');
const test_router = express.Router();
const body = require('body-parser');
const { executeQuery } = require('../database.js');
test_router.use(body.json())
test_router.use(body.urlencoded({ extended: true }));

test_router.options('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'https://to-do-list-react-app-pink.vercel.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.send('fail');
});

test_router.get('/createsqltables' , async(req,res)=>{
    try {
      const query = await executeQuery("create table Customers (customer_name nvarchar(255) , address nvarchar(255) , phone_number_1 nvarchar(255) , phone_number_2 nvarchar(255) , customer_company_name nvarchar(255)) create table Products (Product_name nvarchar(255), Product_size nvarchar(255), sectors_price float , compainies_price float , wholesale_price float , distiubution_price float , serving_type nvarchar(255)) create table Products_cost (Product_name nvarchar(255) , Product_size nvarchar(255) , employees_cost float , distrubution_cost float , workers_cost float , shipping_cost float , addtitional_cost float) create table Product_details (Product_name nvarchar(255) , Product_size nvarchar(255) , afiz_wieght_in_kilo float , empty_bag_wieght_in_kilo float , kartona_wieght_in_kilo float , quantity_in_kartona int , afiz_wieght_in_grams int) create table Store (Product_name nvarchar(255) , Product_size nvarchar(255) , quantity int , color nvarchar(255)) create table Requested_Orders (Product_name nvarchar(255) , Product_size nvarchar(255) , quantity int , color nvarchar(255))",[],[],false)
      return res.status(200).send(query)
    } catch (error) {
      return res.status(404).send(error)
    }
})

test_router.get('/confirm' , async(req,res)=>{
    try {

       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 

       return res.status(200).send('<h1 style="font-size:90px;position:absolute;top:30%;left:25%">Application running</h1>')
       // console.log(1234);
        
       
    } 
    catch(ex) {
     return res.status(404).send(ex.message)
    }
})

module.exports = test_router

