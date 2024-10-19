const express = require('express');
const product_details_router = express.Router();
const body = require('body-parser');
const { executeQuery } = require('../database.js')

product_details_router.use(body.json())
product_details_router.use(body.urlencoded({ extended: true }));

product_details_router.options('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.send('fail');
});


product_details_router.post('/products_details_api' , async(req,res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
        
        const truncate = "TRUNCATE TABLE Product_details";

        await executeQuery(truncate , [] , [] , false);

  
        const header = "INSERT INTO Product_details (Product_name , Product_size , afiz_wieght_in_kilo , empty_bag_wieght_in_kilo , kartona_wieght_in_kilo , quantity_in_kartona , afiz_wieght_in_grams) VALUES";
        
        const dataarray = req.body.map((ele)=>{
          return "(" + "'" +  ele[12] + "'"  + ',' + "'" + ele[10] + "'" + ',' + ele[8] + ',' + ele[6] + ',' + ele[4] + ',' + ele[2] + ',' + ele[0] + ")"
        })

        const query = await executeQuery(header + dataarray , [] , [] , false);
  
        return res.status(200).send({message : 'تم تحديث بيانات تكاليف المنتجات'});
    } catch (error) {
        return res.status(404).send(error.message)
    }
  })

product_details_router.get('/products_details_data' , async(req,res)=>{
    try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 

      const query = await executeQuery("SELECT * FROM Product_details" , [] , [] , false);

      const format = query.recordset.map(item => [
            item['afiz_wieght_in_grams'],
            '✎',
            item['quantity_in_kartona'],
            '✎',
            item['kartona_wieght_in_kilo'],
            '✎',
            item['empty_bag_wieght_in_kilo'],
            '✎',
            item['afiz_wieght_in_kilo'],
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

module.exports = product_details_router  




//create table Product_details (Product_name , Product_size , afiz_wieght_in_kilo , empty_bag_wieght_in_kilo , kartona_wieght_in_kilo , quantity_in_kartona , afiz_wieght_in_grams)