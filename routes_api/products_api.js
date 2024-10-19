const express = require('express');
const products_router = express.Router();
const body = require('body-parser');
const { executeQuery } = require('../database.js')

products_router.use(body.json())
products_router.use(body.urlencoded({ extended: true }));

products_router.options('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.send('fail');
});


products_router.post('/products_api' , async(req,res)=>{
    try {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 

        const truncate = "TRUNCATE TABLE Products";

        const execute = await executeQuery(truncate , [] , [] , false);

        const header = "INSERT INTO Products (Product_name , Product_size , sectors_price , compainies_price , wholesale_price , distiubution_price , serving_type) VALUES";

        if (req.body == []) {
           return
        }
  
        const dataarray = req.body.map((ele , _index)=>{
          return "(" + "'" + ele[12] + "'" + ','  + "'" + ele[10] + "'" + ',' + "'" + ele[8] + "'" + "," + "'" + ele[6] + "'" + "," +"'" + ele[4] + "'"+ "," +"'" + ele[2] + "'"+ "," +"'" + ele[0] + "'" + ")";
      })

      const query = await executeQuery(header + dataarray , [] , [] , false);

      return res.status(200).send({message : 'تم حفظ بيانات المنتجات'});
    } catch (error) {
        return res.status(404).send(error.message)
    }
  })


products_router.get('/products_data' , async(req,res)=>{
    try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 

      const query = await executeQuery("SELECT * FROM Products" , [] , [] , false);

      const format = query.recordset.map(item => [
              item['serving_type'],
              '✎',
              item['distiubution_price'],
              '✎',
              item['wholesale_price'],
              '✎',
              item['compainies_price'],
              '✎',
              item['sectors_price'],
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



  
  
module.exports = products_router
