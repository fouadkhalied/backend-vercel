const express = require('express');
const products_costs_router = express.Router();
const body = require('body-parser');
const { executeQuery } = require('../database.js')

products_costs_router.use(body.json())
products_costs_router.use(body.urlencoded({ extended: true }));

products_costs_router.options('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.send('fail');
});

const headers = ['Product_name' , 'Product_size'  , 'employees_cost' , 'distrubution_cost' , 'workers_cost' , 'shipping_cost' , 'addtitional_cost']



products_costs_router.post('/products_cost_api' , async(req,res)=>{
  try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 

      const truncate = "TRUNCATE TABLE Products_cost";

      await executeQuery(truncate , [] , [] , false);

      const header = "INSERT INTO Products_cost (Product_name , Product_size , employees_cost , distrubution_cost , workers_cost , shipping_cost , addtitional_cost) VALUES";

      if (req.body == []) {
         return
      }

      const dataarray = req.body.map((ele , _index)=>{
        return "("  + "'" +  ele[12] + "'"  + ',' +  "'"  + ele[10] + "'" + ','  + ele[8]  + ','  + ele[6]  + ',' + ele[4] + ',' + ele[2] + ',' + ele[0]  +  ")";
    })

    console.log(dataarray);
    

    await executeQuery(header + dataarray , [] , [] , false);

    return res.status(200).send({message : 'تم حفظ بيانات المنتجات'});
  } catch (error) {
      return res.status(404).send(error.message)
  }
})


products_costs_router.get('/products_cost_data' , async(req,res)=>{
  try {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 

    const query = await executeQuery("SELECT * FROM Products_cost" , [] , [] , false);

    const format = query.recordset.map(item => [
            item['addtitional_cost'],
            '✎',
            item['shipping_cost'],
            '✎',
            item['workers_cost'],
            '✎',
            item['distrubution_cost'],
            '✎',
            item['employees_cost'],
            '✎',
            item['Product_size'],
            '✎',
            item['Product_name'],
            '✎',
            '❌'
  ]);

    res.status(200).send(format)
     

  } catch (error) {
     return res.status(200).send(error.message);
  }
})


  module.exports = products_costs_router







