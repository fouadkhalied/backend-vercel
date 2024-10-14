const sql = require('mssql/msnodesqlv8');

const config = {
    server : "test",
    database : "store",
    driver : "{SQL Server}",
    options : {
        TrustedConnection : true
    } 
}

sql.connect(config , (err)=>{
    console.log(err)
})