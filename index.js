const express = require('express')
const app = express()
const {connect} = require('./database.js')
const body_parser = require('body-parser')
const cors = require('cors')
const customer_router = require('./routes_api/customer_api.js')
const products_router = require('./routes_api/products_api.js')
const product_details_router = require('./routes_api/products_details_api.js')
const store_router = require('./routes_api/store_api.js')
const test_router = require('./routes_api/testing_route.js')
const products_costs_router = require('./routes_api/products_costs_api.js')
const port = process.env.PORT || 5000


app.use(customer_router)
app.use(products_router)
app.use(products_costs_router)
app.use(product_details_router)
app.use(store_router)
app.use(test_router)
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended : true}))
app.use(cors())


connect().then((connection)=>{
    console.log('connected to database')
}).catch((error)=>{
    throw new Error("not allowed to access app") 
})

app.listen(port,()=>{console.log('app run on port 5000')})

module.exports = app