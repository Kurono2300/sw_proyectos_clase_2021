const express = require('express');
const router = express.Router();
const { addOne, addnNote, setClosingNote,
        setEvaluationNote, setHolder} = require('./helpdesk.model')


router.post("/nuevo", async (req, res)=>{
    try{
    	let {fecha, tipo, observacion,servicioAfectado,
            estado, usuarioIdentidad, usuarioNombre, usuarioCorreo} = req.body;

    	let docInserted = await addOne(fecha, tipo, observacion, servicioAfectado,
            estado, usuarioIdentidad, usuarioNombre, usuarioCorreo);
    	res.status(200).json(docInserted);
    }catch(ex){
    	res.status(500).json({"msg":"Error"});
    }
});


router.put("/agregarnota/:id", async (req, res)=>{
	try{
		const {id} = req.params;
		const {fecha, observacion, accion, identidad, nombre, correo} = req.body;
		let result = await addnNote(id, fecha, observacion, accion, identidad, nombre, correo);
		res.status(200).json(result);
	}catch(ex){
        console.log(ex);
		res.status(500).json({ "msg": "Error" });
	}
});



router.put("/cerrar/:id", async (req, res)=>{
	try{
		const {id} = req.params;
		const {fechaCierre, identidad, nombre, correo, tipoCierre} = req.body;
		let result = await setClosingNote(id, fechaCierre, identidad, nombre, correo, tipoCierre);
		res.status(200).json(result);
	}catch(ex){
        console.log(ex);
		res.status(500).json({ "msg": "Error" });
	}
});


router.put("/evaluar/:id", async (req, res)=>{
	try{
		const {id} = req.params;
		const {eficiencia, satisfaccion, conformidad} = req.body;
		let result = await setEvaluationNote(id, eficiencia, satisfaccion, conformidad);
		res.status(200).json(result);
	}catch(ex){
        console.log(ex);
		res.status(500).json({ "msg": "Error" });
	}
});


router.put("/capturarTicket/:id", async (req, res)=>{
	try{
		const {id} = req.params;
		const {identidad, nombre, correo} = req.body;
		let result = await setHolder(id, identidad, nombre, correo);
		res.status(200).json(result);
	}catch(ex){
        console.log(ex);
		res.status(500).json({ "msg": "Error" });
	}
});

module.exports = router;