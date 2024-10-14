const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const router = express.Router();
const body = require('body-parser');
const path = require('path');
const { convertArrayToCSV } = require('convert-array-to-csv');

router.use(body.json())
router.use(body.urlencoded({ extended: true }));

router.options('*', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'https://to-do-list-react-app-pink.vercel.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.send('fail');
});

router.get('/confirm' , async(req,res)=>{
     try {

        //res.setHeader('Access-Control-Allow-Origin', 'https://to-do-list-react-app-pink.vercel.app'); 
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 

        return res.status(200).send('Application running')
        // console.log(1234);
         
        
     } 
     catch(ex) {
      return res.status(404).send(ex.message)
     }
})

//   العملاء
router.post('/customers_api' , async(req,res)=>{
    try {

      res.setHeader('Access-Control-Allow-Origin', 'https://to-do-list-react-app-pink.vercel.app'); 

        const file = path.join(__dirname , './csv_folder/customer.csv');

        const headers = ['Customer_name' , 'Customer_address' , 'Customer_contact_1' , 'Customer_contact_2' , 'Customer_company_name']
        const dataarray = req.body.map((ele)=>{
           return [ele[8],ele[6],ele[4],ele[2],ele[0]]
        })

          fs.stat(file, (err, stats) => {
            if (err) {
              res.status(200).send({message : 'Error in opening CSV file'});
            } else {
              if (stats.isFile()) {
                console.log('File is a regular file.');
              } else if (stats.isDirectory()) {
                console.log('File is a directory.');
              } else {
                console.log('File is of unknown type.');
              }
            }
          });

           const csvarray = convertArrayToCSV(dataarray,{
            header : headers , separator : ','
           })

          fs.writeFile(file, csvarray, (err) => {
            if (err) {
              res.status(200).send({message : 'Error in writing in CSV file'});
            } else {
              res.status(200).send({message : 'CSV file written succesfully'});
            }
          });
        //console.log(req.body);
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.get('/customers_data' , async(req,res)=>{
     try {
        res.setHeader('Access-Control-Allow-Origin', 'https://to-do-list-react-app-pink.vercel.app'); 
        let response = null
        const file = path.join( __dirname , './csv_folder/customer.csv')
        fs.createReadStream(file).pipe(csv()).on('data' , (data)=>{
          response = data
        }).on('end' , ()=>{
          return res.status(200).send({"message" : response});
        })
        .on('error', (error) => {
          res.status(200).send('Error processing CSV file'); 
        });
     } catch (error) {
        return res.status(200).send('error in csv file => ' , error.message);
     }
})
// المخزن 

router.post('/store_api' , async(req,res)=>{
  try {
      res.setHeader('Access-Control-Allow-Origin', 'https://to-do-list-react-app-pink.vercel.app'); 

      const file = path.join(__dirname , '../csv_folder/store.csv');

      const headers = ['Product_name' , 'Product_size' , 'quantity']
      const dataarray = req.body.map((ele)=>{
        return [ele[4],ele[2],ele[0]]
      })

        fs.stat(file, (err, stats) => {
          if (err) {
            console.error('Error getting file information:', err);
          } else {
            if (stats.isFile()) {
              console.log('File is a regular file.');
            } else if (stats.isDirectory()) {
              console.log('File is a directory.');
            } else {
              console.log('File is of unknown type.');
            }
          }
        });

         const csvarray = convertArrayToCSV(dataarray,{
          header : headers , separator : ','
         })

        fs.writeFile(file, csvarray, (err) => {
          if (err) {
            console.error('Error writing JSON file:', err);
          } else {
            console.log('JSON file written successfully!');
          }
        });
      //await fs.writeFile(file , dat)
      // res.status(200).send('تم تحديث العملاء');
      //console.log(req.body);
      return res.status(200).send({message : 'تم تحديث بيانات المخزن'});
  } catch (error) {
      return res.status(404).send(error.message)
  }
})

// المنتجات

router.post('/products_api' , async(req,res)=>{
  try {
      res.setHeader('Access-Control-Allow-Origin', 'https://to-do-list-react-app-pink.vercel.app'); 
      console.log(1243);
      

      const file = path.join(__dirname , '../csv_folder/customer.csv');

      const headers = ['Product_name' , 'Product_size' , 'sectors_price' , 'compainies_price' , 'wholesale_price' , 'distiubution_price' , 'serving_type']
      const dataarray = req.body.map((ele)=>{
        return [ele[12],ele[10],ele[8],ele[6],ele[4],ele[2],ele[0]]
      })

        fs.stat(file, (err, stats) => {
          if (err) {
            console.error('Error getting file information:', err);
          } else {
            if (stats.isFile()) {
              console.log('File is a regular file.');
            } else if (stats.isDirectory()) {
              console.log('File is a directory.');
            } else {
              console.log('File is of unknown type.');
            }
          }
        });

         const csvarray = convertArrayToCSV(dataarray,{
          header : headers , separator : ','
         })

        fs.writeFile(file, csvarray, (err) => {
          if (err) {
            console.error('Error writing JSON file:', err);
          } else {
            console.log('JSON file written successfully!');
          }
        });
      //await fs.writeFile(file , dat)
      // res.status(200).send('تم تحديث العملاء');
      //console.log(req.body);
      return res.status(200).send({message : 'تم تحديث بيانات المنتجات'});
  } catch (error) {
      return res.status(404).send(error.message)
  }
})



// تكاليف المنتجات

router.post('/products_costs_api' , async(req,res)=>{
  try {
      res.setHeader('Access-Control-Allow-Origin', 'https://to-do-list-react-app-pink.vercel.app'); 
      console.log(1243);
      

      const file = path.join(__dirname , '../csv_folder/products_costs.csv');

      const headers = ['Product_name' , 'Product_size' , 'sectors_cost' , 'employees_cost' , 'distrubution_cost' , 'workers_cost' , 'shipping_cost' , 'addtitional_cost']
      const dataarray = req.body.map((ele)=>{
        return [ele[14],ele[12],ele[10],ele[8],ele[6],ele[4],ele[2],ele[0]]
      })

        fs.stat(file, (err, stats) => {
          if (err) {
            console.error('Error getting file information:', err);
          } else {
            if (stats.isFile()) {
              console.log('File is a regular file.');
            } else if (stats.isDirectory()) {
              console.log('File is a directory.');
            } else {
              console.log('File is of unknown type.');
            }
          }
        });

         const csvarray = convertArrayToCSV(dataarray,{
          header : headers , separator : ','
         })

        fs.writeFile(file, csvarray, (err) => {
          if (err) {
            console.error('Error writing JSON file:', err);
          } else {
            console.log('JSON file written successfully!');
          }
        });
      //await fs.writeFile(file , dat)
      // res.status(200).send('تم تحديث العملاء');
      //console.log(req.body);
      return res.status(200).send({message : 'تم تحديث بيانات تكاليف المنتجات'});
  } catch (error) {
      return res.status(404).send(error.message)
  }
})

// تفاصيل الافيز 

router.post('/products_details_api' , async(req,res) => {
  try {
      res.setHeader('Access-Control-Allow-Origin', 'https://to-do-list-react-app-pink.vercel.app'); 
      console.log(1243);
      

      const file = path.join(__dirname , '../csv_folder/products_details.csv');

      const headers = ['Product_name' , 'Product_size' , 'afiz_wieght_in_kilo' , 'empty_bag_wieght_in_kilo' , 'kartona_wieght_in_kilo' , 'quantity_in_kartona' , 'afiz_wieght_in_grams']
      const dataarray = req.body.map((ele)=>{
        return [ele[12],ele[10],ele[8],ele[6],ele[4],ele[2],ele[0]]
      })

        fs.stat(file, (err, stats) => {
          if (err) {
            console.error('Error getting file information:', err);
          } else {
            if (stats.isFile()) {
              console.log('File is a regular file.');
            } else if (stats.isDirectory()) {
              console.log('File is a directory.');
            } else {
              console.log('File is of unknown type.');
            }
          }
        });

         const csvarray = convertArrayToCSV(dataarray,{
          header : headers , separator : ','
         })

        fs.writeFile(file, csvarray, (err) => {
          if (err) {
            console.error('Error writing JSON file:', err);
          } else {
            console.log('JSON file written successfully!');
          }
        });
      //await fs.writeFile(file , dat)
      // res.status(200).send('تم تحديث العملاء');
      //console.log(req.body);
      return res.status(200).send({message : 'تم تحديث بيانات تكاليف المنتجات'});
  } catch (error) {
      return res.status(404).send(error.message)
  }
})

module.exports = router
