const MongoDB = require('../../utilities/db');
const {ObjectId} = require('bson');
let db;
let helpdeskCollection;

// Conexion a la coleccion

(async function(){
    try{
        if (!helpdeskCollection) {
            db = await MongoDB.getDB();
            helpdeskCollection = db.collection("helpdesk");
            if(process.env.ENSURE_INDEX == 1){
            // Aegurar de que exista el indice
            }
        }
    }catch(ex){
        console.log(ex);
        process.exit(1);
    }
})();



module.exports.addOne = async (fecha, tipo, observacion,servicioAfectado,
    estado, usuarioIdentidad, usuarioNombre, usuarioCorreo)=>{
    try{
        let newSnippet = {
            fecha:fecha,
            tipo:tipo,
            observacion:observacion,
            servicioAfectado:servicioAfectado, 

            usuario:{"identidad":usuarioIdentidad,
            "nombre":usuarioNombre,
            "correo":usuarioCorreo},
            
            holder:{"identidad": null, 
            "nombre": null, 
            "correo":null},

            estado:estado,

            notas:[/*{"fecha":null,
            "observacion":null,
            "accion":null,
            "usuario":{"identidad":null,
            "nombre":null,
        "correo":null}}*/],

            fechaCierre:null, 

            usuarioCierre:{"identidad":null,
            "nombre":null,
            "correo":null},

            tipoCierre:null,

            evaluacion:{"eficiencia":null,
                "satisfaccion":null,
                "conformidad":null}
        };
        let result = await helpdeskCollection.insertOne(newSnippet);
        return result.ops;
    }catch(ex){
        console.log(ex);
        throw(ex);
    }
}


module.exports.addnNote = async (id, fecha, observacion, accion, identidad, nombre, correo) =>{
    try {
        const _id = new ObjectId(id);
        const filter = {"_id": _id};
        const updateObj = {"$push":{"notas":{"fecha":fecha, 
        "observacion":observacion, "accion": accion,
        "usuario":{"identidad":identidad, "nombre": nombre, "correo":correo}}}};     
        
        let result = await helpdeskCollection.updateOne(filter, updateObj);
        return result;

    } catch(ex) {
        console.log(ex);
        throw(ex);
    }
}


module.exports.setClosingNote = async (id, fechaCierre, identidad, nombre, correo, tipoCierre) =>{
    try {
        const _id = new ObjectId(id);
        const filter = {"_id": _id};
        const updateObj = {"$set":{"fechaCierre":fechaCierre, "usuarioCierre":{"identidad":identidad,
        "nombre": nombre, "correo": correo}, "tipoCierre":tipoCierre}};

        let result = await helpdeskCollection.updateOne(filter, updateObj);
        return result;

    } catch(ex) {
        console.log(ex);
        throw(ex);
    }
}



module.exports.setEvaluationNote = async (id, eficiencia, satisfaccion, conformidad) =>{
    try {
        const _id = new ObjectId(id);
        const filter = {"_id": _id};

        const updateObj = {"$set":{"evaluacion":{"eficiencia":eficiencia, "satisfaccion":satisfaccion, "conformidad":conformidad}}};

        let result = await helpdeskCollection.updateOne(filter, updateObj);
        return result;

    } catch(ex) {
        console.log(ex);
        throw(ex);
    }
}


module.exports.setHolder = async (id, identidad, nombre, correo) =>{
    try {
        const _id = new ObjectId(id);
        const filter = {"_id": _id};

        const updateObj = {"$set":{"holder":{"identidad":identidad, "nombre":nombre, "correo":correo}}};

        let result = await helpdeskCollection.updateOne(filter, updateObj);
        return result;

    } catch(ex) {
        console.log(ex);
        throw(ex);
    }
}



module.exports.getByUser = async (identidadUser, estado, page) => {
    try {
        let itemsPerPage = 25;
        const filter = {"estado":estado,"usuario.identidad":identidadUser};
        let options = {
        skip: (page - 1) * itemsPerPage,
        limit: itemsPerPage//,
        //projection: {tipo:1, observacion:1, servicioAfectado:1},
        //sort:[["fecha", 1]]
    };

    let docsCursor = helpdeskCollection.find(filter, options);
    let rownum = await docsCursor.count();
    let rows = await docsCursor.toArray()
    return {rownum, rows};
    } catch (ex) {
        console.log(ex);
        throw (ex);
    }
}


module.exports.getByHolder = async (identidadHolder, estado, page) => {
    try {
        itemsPerPage = 25;
        const filter = {"estado":estado,"holder.identidad":identidadHolder};
        let options = {
        skip: (page - 1) * itemsPerPage,
        limit: itemsPerPage//,
        //projection: {tipo:1, observacion:1, servicioAfectado:1},
        //sort:[["fecha", 1]]
    };

    let docsCursor = helpdeskCollection.find(filter, options);
    let rownum = await docsCursor.count();
    let rows = await docsCursor.toArray()
    return {rownum, rows};
    } catch (ex) {
        console.log(ex);
        throw (ex);
    }
}


module.exports.getTickets = async (estado, page) => {
    try {
        let itemsPerPage = 25;
        const filter = {"estado":estado};
        let options = {
        skip: (page - 1) * itemsPerPage,
        limit: itemsPerPage//,
        //projection: {tipo:1, observacion:1, servicioAfectado:1},
        //sort:[["fecha", 1]]
    };

    let docsCursor = helpdeskCollection.find(filter, options);
    let rownum = await docsCursor.count();
    let rows = await docsCursor.toArray()
    return {rownum, rows};
    } catch (ex) {
        console.log(ex);
        throw (ex);
    }
}



module.exports.getTicketsByDateDesc = async (estado, page) => {
    try {
        let itemsPerPage = 25;
        const filter = {"estado":estado};
        let options = {
        skip: (page - 1) * itemsPerPage,
        limit: itemsPerPage,
        //projection: {tipo:1, observacion:1, servicioAfectado:1},
        sort:[["fecha",'desc',1]]
    };

    let docsCursor = helpdeskCollection.find(filter, options);
    let rownum = await docsCursor.count();
    let rows = await docsCursor.toArray()
    return {rownum, rows};
    } catch (ex) {
        console.log(ex);
        throw (ex);
    }
}


module.exports.getTicketsById = async (id)=>{
    try {
        const _id = new ObjectId(id);
        const filter =  {_id: _id};
        let row = await helpdeskCollection.findOne(filter);
        return row;
    } catch(ex){
        console.log(ex);
        throw(ex);
    }
}
