const sql = require('mssql');
require('dotenv').config();

// const config = {
//     server : 'FOUAD/MSSQLYASSIN',
//     database : 'store',
//     user : 'MSSQLSERVERYASSIN',
//     password : 'fouad2005bx',
//     options : {
//         enableArithAbort : true ,
//         trustServerCertificate : tru
//     }
//     port : 1433
// };

const config = {  
    server: process.env.MYSERVER,  
        authentication: {
        type: 'default',
        options: {
            userName: process.env.USERNAME_OF_SQL_SERVER, 
            password: process.env.PASSWORD  
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        enableArithAbort : true ,
        trustServerCertificate: true,
        database: process.env.DATABASE
    },
    port : parseInt(process.env.PORT_OF_SQL_SERVER)
};  
console.log(process.env.MYSERVER);
console.log(process.env.USERNAME_OF_SQL_SERVER);
console.log(process.env.PASSWORD);
console.log(process.env.PORT_OF_SQL_SERVER);
console.log(process.env.DATABASE);

// Normal queries to db handled here
async function executeQuery(query, values = [], paramNames = [], isStoredProcedure = true, outputParamName = null) {
    try {
      const pool = await sql.connect(config);
      const request = pool.request();
  
      if (values && paramNames) {
        for (let i = 0; i < values.length; i++) {
          request.input(paramNames[i], values[i]);
        }
      }
  
      // Handle output parameter
      if (outputParamName) {
        request.output(outputParamName, sql.Int);
      }
      
      // console.log("VALUES ", values);
      // console.log("PARAM ", paramNames);
      // console.log("QUERY " , query);
      // console.log("REQUEST ", request.parameters);
      values.forEach((val, index) => {
        if (typeof val === 'undefined') {
          console.error(`Undefined value found for ${paramNames[index]}`);
        }
      });
      
      let result;
      if (isStoredProcedure) {
        result = await request.execute(query);
      } else {
        result = await request.batch(query);
      }
  
      if (outputParamName) {
        result = { ...result, [outputParamName]: request.parameters[outputParamName].value };
      }
  
      return result;
    
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // Bulk queries handled here
  async function executeTableValuedQuery(query, table, paramNames = [], isStoredProcedure = true, outputParamName = null) {
    try {
      const pool = await sql.connect(config);
      const request = pool.request();
  
      // Setting the table-valued parameter
      if (table instanceof sql.Table) {
        request.input(paramNames, table);
      }
  
      // Handle output parameter
      if (outputParamName) {
        request.output(outputParamName, sql.Int);
      }
  
      let result;
      if (isStoredProcedure) {
        result = await request.execute(query);
      } else {
        result = await request.batch(query);
      }
  
      if (outputParamName) {
        result = { ...result, [outputParamName]: request.parameters[outputParamName].value };
      }
      
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

module.exports = {
    connect : ()=>sql.connect(config),
    sql,executeQuery,executeTableValuedQuery
}
