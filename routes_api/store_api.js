const express = require('express');
const store_router = express.Router();
const body = require('body-parser');
const { executeQuery } = require('../database.js');
store_router.use(body.json())
store_router.use(body.urlencoded({ extended: true }));

store_router.options('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.send('fail');
});

store_router.post('/store_api' , async(req,res) => {
  try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
      
      const truncate = "TRUNCATE TABLE Store";

      await executeQuery(truncate , [] , [] , false);


      const header = "INSERT INTO Store (Product_name , Product_size , quantity , color) VALUES";
      
      const dataarray = req.body.map((ele)=>{
        return "(" + "'" +  ele[6] + "'" + "," + "'" +  ele[4] + "'"  + ',' + ele[2]  + ',' + "'" + ele[0] + "'" + ")";
      })

      console.log(dataarray);
      

      await executeQuery(header + dataarray , [] , [] , false);

      return res.status(200).send({message : 'تم تحديث بيانات المخزن'});
  } catch (error) {
      return res.status(404).send(error.message)
  }
})

store_router.get('/store_data' , async(req,res)=>{
  try {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 

    const query = await executeQuery("SELECT * FROM Store" , [] , [] , false);

    console.log(query);
    

    const format = query.recordset.map(item => [
          item['color'],
          '✎',
          item['quantity'],
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


module.exports = store_router
