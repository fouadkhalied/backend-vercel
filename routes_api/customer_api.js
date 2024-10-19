const express = require('express');
const customer_router = express.Router();
const body = require('body-parser');
const { executeQuery } = require('../database.js')

customer_router.use(body.json())
customer_router.use(body.urlencoded({ extended: true }));

customer_router.options('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.send('fail');
});

customer_router.post('/customers_api' , async(req,res)=>{
    try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 

      const truncate = "TRUNCATE TABLE Customers";

      const execute = await executeQuery(truncate , [] , [] , false);

      console.log(execute);

      const header = "INSERT INTO Customers (customer_name , address , phone_number_1 , phone_number_2 , customer_company_name) VALUES";

      const dataarray = req.body.map((ele , _index)=>{
          return "(" + "'" + ele[8] + "'" + "," + "'" + ele[6] + "'" + "," +"'" + ele[4] + "'"+ "," +"'" + ele[2] + "'"+ "," +"'" + ele[0] + "'" + ")";
      })



      if(dataarray.length == 0)
          return; 

      await executeQuery(header + dataarray , [] , [] , false);

      console.log(dataarray);
      

      return res.status(200).send({message : 'تم تحديث بيانات العملاء'});
    } catch (error) {
        return res.status(200).send(error.message)
    }
})

customer_router.get('/customers_data' , async(req,res)=>{
     try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 

        const query = await executeQuery("SELECT * FROM Customers" , [] , [] , false);

const format = query.recordset.map(item => [
  item['customer_company_name'],
  '✎',
  item['phone_number_2'],
  '✎',
  item['phone_number_1'],
  '✎',
  item['address'],
  '✎',
  item['customer_name'],
  '✎',
  '❌'
]);

        res.status(200).send(format)
        

     } catch (error) {
        return res.status(200).send('error in csv file => ' , error.message);
     }
})


module.exports = customer_router
