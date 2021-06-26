var express = require("express");
var router = express.Router();

const {getAll, getById, addNew, update, deleteRow } = require("./canciones.model");

router.get("/", (req, res)=>{
	res.status(200).json({"version":0.01});
}); //get /


router.get("/all", (req, res)=>{
  getAll((err, rows)=>{
      if(err){
        res.status(500).json({"msg":"Error al Procesar"});
      }else{
        res.status(200).json(rows);
      }
  });
});




router.get("/byid/:id",(req, res)=>{
    const { id } = req.params;
    getById(id, (err, rows)=>{
      if(err){
        res.status(500).json({msg:"error"});
      } else {
        res.status(200).json(rows);
      }
  });
});


router.post("/new", (req, res)=>{
    const { snippetName, snippet, stated } = req.body;
    //validaciones
    addNew(snippetName, snippet, stated, (err, result)=>{
        if(err) {
          res.status(500).json({"msg":"error"});
        } else {
          res.status(200).json(result);
        }
  });
});




router.put("/update/:id", (req, res)=>{
    const {id} = req.params;
    const { snippetName, snippet, stated } = req.body;
    //validaciones
    update(snippetName, snippet, stated, id, (err, result) => {
      if (err) {
        res.status(500).json({ "msg": "error" });
      } else {
        res.status(200).json(result);
      }
    });
});



router.delete("/delete/:id", (req, res)=>{
    const { id } = req.params;
    //validaciones
    deleteRow(id, (err, result)=>{
      if (err) {
        res.status(500).json({ "msg": "error" });
      } else {
        res.status(200).json(result);
      }
  });
});




module.exports = router;
