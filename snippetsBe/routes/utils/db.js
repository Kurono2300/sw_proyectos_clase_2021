var mysql = require("mysql");

var mysqlConn = mysql.createConnection({
	host : "localhost",
	user : "root",
	password: "unicah",
	database: "sw202102"
});

mysqlConn.connect((err)=>{
	if(err){
		console.log(err);
		process.exit(1);
	}
} );

var query = (sql, args)=>{
  return new Promise(
    (resolve, reject) => {
      mysqlConn.query(sql, args, (err, rows)=>{
        if(err)
          return reject( err );
        resolve( rows );
      });
    }
  );
}


module.exports = {mysqlConn, query};
