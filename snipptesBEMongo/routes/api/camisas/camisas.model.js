const MongoDB = require('../../utilities/db');
const {ObjectId} = require('bson');
let db;
let camisasCollection;

(async function(){
    try{
        if (!camisasCollection) {
            db = await MongoDB.getDB();
            camisasCollection = db.collection("camisas");
            if(process.env.ENSURE_INDEX == 1){
            // Vamos a asegurarnos de que exista el indice
            }
        }
    }catch(ex){
        console.log(ex);
        process.exit(1);
    }
})();


module.exports.getAll = async ()=>{
    try {
        let docsCursor = camisasCollection.find({});
        let rows = await docsCursor.toArray()
        return rows;
    }catch(ex){
        console.log(ex);
        throw(ex);
    }
}


module.exports.getByType = async (type)=>{
    try {
        const filter =  {tipo: type};
        let cursor = await camisasCollection.find(filter);
        let rows = await cursor.toArray();
        return rows;
    } catch(ex){
        console.log(ex);
        throw(ex);
    }
}


module.exports.getByGTSales = async (ventas)=>{
    try {
        const filter = {ventas:{ "$gt": ventas}};
        let cursor = camisasCollection.find(filter);
        let rows = await cursor.toArray();
        return rows;
        
    } catch (ex) {
        console.log(ex);
        throw (ex);
    }
}


module.exports.getByLTSales = async (ventas)=>{
    try {
        const filter = {ventas:{ "$lt": ventas}};
        let cursor = camisasCollection.find(filter);
        let rows = await cursor.toArray();
        return rows;
        
    } catch (ex) {
        console.log(ex);
        throw (ex);
    }
}


module.exports.getBySalesRange = async (lowerLimit, upperLimit, includeExtremes)=>{
    try {
        const range = (includeExtremes) ? {"$gte":lowerLimit, "$lte": upperLimit}: {"$gt":lowerLimit, "$lt": upperLimit};
        const filter = {ventas:range };
        let cursor = camisasCollection.find(filter);
        let rows = await cursor.toArray();
        return rows;
        
    } catch (ex) {
        console.log(ex);
        throw (ex);
    }
}






// _id = 60c9513db93bff0ad8ad72a9




// Operadores en Mongodb son distintos

/*
Select * from snippets where sales = 3;
db.snippets.find({sales:3});
select * from snippets where sales > 50; greater than 
select * from snippets where sales < 50; less than
select * from snippets where sales >= 80; greater than or equal
select * from snippets where sales <= 40;
db.snippets.find({sales: {$gt : 50} })
db.snippets.find({sales: {$lt : 50} })
db.snippets.find({sales: {$gte : 80} })
db.snippets.find({sales: {$lte : 40} })
select * from snippets where sales > 20 and sales < 30;
db.snippets.find({sales : {$gt:20, $lt:30} });
*/