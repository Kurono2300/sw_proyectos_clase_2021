const express = require('express');
const router = express.Router();
const { addOne, addnNote, setClosingNote,
        setEvaluationNote, setHolder, getByUser,
        getByHolder, getTickets, getTicketsByDateDesc, getTicketsById} = require('./helpdesk.model')


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



router.get("/ticketsbyuser/:estado/:page", async (req, res) => {
	try {
		let { estado, page } = req.params;
        const { identidad } = req.body;
		let rows = await getByUser(identidad, estado, page);
		res.status(200).json(rows);
	} catch (ex) {
		console.log(ex);
		res.status(500).json({ "msg": "Error" });
	}
});


router.get("/ticketsbyholder/:estado/:page", async (req, res) => {
	try {
		let { estado, page } = req.params;
        const { identidad } = req.body;
		let rows = await getByHolder(identidad, estado, page);
		res.status(200).json(rows);
	} catch (ex) {
		console.log(ex);
		res.status(500).json({ "msg": "Error" });
	}
});



router.get("/tickets/:estado/:page", async (req, res) => {
	try {
		let { estado, page } = req.params;
		let rows = await getTickets(estado, page);
		res.status(200).json(rows);
	} catch (ex) {
		console.log(ex);
		res.status(500).json({ "msg": "Error" });
	}
});



router.get("/ticketsage/:estado/:page", async (req, res) => {
	try {
		let { estado, page } = req.params;
		let rows = await getTicketsByDateDesc(estado, page);
		res.status(200).json(rows);
	} catch (ex) {
		console.log(ex);
		res.status(500).json({ "msg": "Error" });
	}
});



router.get("/ticketbyid/:id", async (req, res) => {
	try {
		let { id } = req.params;
		let rows = await getTicketsById(id);
		res.status(200).json(rows);
	} catch (ex) {
		console.log(ex);
		res.status(500).json({ "msg": "Error" });
	}
});



module.exports = router;