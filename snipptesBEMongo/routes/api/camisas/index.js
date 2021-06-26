const express = require('express');
const router = express.Router();
const { getAll, getByType, getByGTSales, getByLTSales, getBySalesRange } = require('./camisas.model');


router.get("/all", async (req, res)=>{
    try{
    	let rows = await getAll();
    	res.status(200).json(rows);
    }catch(ex){
    	res.status(500).json({"msg":"Error"});
    }
});


router.get("/byType/:type", async (req, res)=>{
	try{
		let {type} = req.params;
		let row = await getByType(type);
		res.status(200).json(row);
	}catch(ex){
		res.status(500).json({ "msg": "Error" });
	}
});


router.get("/byGTSales/:sales", async (req, res)=>{
	try{
		let {sales} = req.params;
		let _sales = parseInt(sales);

		let rows = await getByGTSales(_sales);
		res.status(200).json(rows);
	}catch(ex){
		res.status(500).json({ "msg": "Error" });
	}
});


router.get("/byLTSales/:sales", async (req, res)=>{
	try{
		let {sales} = req.params;
		let _sales = parseInt(sales);

		let rows = await getByLTSales(_sales);
		res.status(200).json(rows);
	}catch(ex){
		res.status(500).json({ "msg": "Error" });
	}
});

router.get("/bySales/range/:ll/:ul/:ex", async (req, res)=>{
	try{
		let {ll, ul, ex} = req.params;
		let _ll = parseInt(ll);
		let _ul = parseInt(ul);
		let _ex = parseInt(ex) && true;
		
		let rows = await getBySalesRange(_ll, _ul, _ex);
		res.status(200).json(rows);
	}catch(ex){
		console.log(ex);
		res.status(500).json({ "msg": "Error" });
	}
});


module.exports = router;


