
const { mysqlConn, query} = require('../../utils/db');
// allHandler(err, returnValue)

// Funcional
// ---------------------------------------------------------------------------
module.exports.getAll = (handler)=>{
  mysqlConn.query(
    "SELECT * from canciones;",
    (err, rows)=>{
      if(err){
        console.log(err);
        handler(err, null);
      }else{
        handler(null, rows);
      }
    }
  );
};

module.exports.getById = (id, handler)=>{
  const sqlstr = "SELECT * from canciones where id=?;";
  mysqlConn.query(
    sqlstr,
    [id],
    (err, result)=>{
      if(err){
        console.log(err);
        handler(err, null);
      } else {
        handler(null, result);
      }
    }
  );
}

module.exports.addNew = (nombre, autor, album, anio, genero, handler ) =>{
  const sqlstr = "INSERT INTO canciones (nombre, autor, album, anio, genero) values (?,?,?);";
  mysqlConn.query(
    sqlstr,
    [nombre, autor, album, anio, genero],
    (err, result)=>{
      if(err){
        console.log(err);
        handler(err, null);
      }else {
        handler(null, result);
      }
    }
  );
}

module.exports.update = (nombre, autor, album, anio, genero, id ,handler) => {
  const sqlstr = "UPDATE canciones set nombre = ?, autor = ?, album = ?, anio = ?, genero = ? where id = ?;";
  mysqlConn.query(
    sqlstr,
    [nombre, autor, album, anio, genero, id],
    (err, result) => {
      if (err) {
        console.log(err);
        handler(err, null);
      } else {
        handler(null, result);
      }
    }
  );
}

module.exports.deleteRow =  (id, handler) => {
  const sqlstr = "DELETE FROM canciones where id = ?;";
  mysqlConn.query(
    sqlstr,
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        handler(err, null);
      } else {
        handler(null, result);
      }
    }
  );
}


