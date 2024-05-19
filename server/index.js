const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());

//parametros de la conexion a la bd
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "busway",
});

db.connect((err) => {

    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});
//----------sentencias SQL sobre la bd de compañia---------------
app.post("/createCompania", (req, res) => {
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const telefono = req.body.telefono;


    db.query("INSERT INTO compania (nombre, correo, telefono) VALUES (?, ?, ?)",
        [nombre, correo, telefono],
        (error, result) => {
            if (error) {
                console.log('Error al insertar en la base de datos:', error);

            } else {
                res.send(result);
            }

        }
    );
});
app.get("/selectCompania", (req, res) => {
    db.query("SELECT nombre FROM compania",
        (error, result) => {
            if (error) {
                console.log('Error al seleccionar en la base de datos:', error);
                res.status(500).send("Error al seleccionar en la base de datos");
            } else {
                res.send(result);
            }
        }
    );
});
app.get("/compania", (req,res)=>{
    db.query("SELECT * FROM compania",
        (error, result) =>{
            if(error){
                console.log("error al seleccionar en la bd compañia")
            }else{
                res.send(result);
            }
        }
    );
});
app.delete("/deleteCompania/:id", (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM compania WHERE id_compania=?', id, (error, result) => {
        if (error) {
            console.log('Error al eliminar en la base de datos:', error);
            res.status(500).send("Error al eliminar en la base de datos");
        } else {
            res.send(result);
        }
    });
});
app.put("/updateCompania", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const telefono = req.body.telefono;



    db.query("UPDATE compania SET nombre=?, correo=?, telefono=? WHERE id_compania=?",
        [nombre, correo, telefono, id],
        (error, result) => {
            if (error) {
                console.log('Error al actualizar en la base de datos:', error);

            }else{
                res.send(result);
            }
            
        }
    );
});



//----------sentencias SQL sobre la bd de autobuses--------------
app.get("/bus", (req,res)=>{
    db.query("SELECT * FROM bus",
        (error, result) =>{
            if(error){
                console.log("error al seleccionar en la bd compañia")
            }else{
                res.send(result);
                
            }
        }
    );
});
app.post("/createBus", (req, res) => {
    const numeroBus = req.body.numeroBus;
    const placa = req.body.placa;
    const compania = req.body.companiaSeleccionada; 
    const lugares = req.body.lugares; 
    // Convierte el array de lugares a una cadena separada por comas
    const lugaresString = lugares.join(',');
    db.query(
        "INSERT INTO bus (numeroBus, placa, lugares,compania) VALUES (?, ?, ?, ?)",
        [numeroBus, placa, lugaresString, compania],
        (error, result) => {
            if (error) {
                console.log('Error al insertar en la base de datos:', error);
                res.status(500).send("Error al insertar en la base de datos");
            } else {
                res.send(result);
            }
        }
    );
});
app.delete("/deleteBus/:id", (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM bus WHERE id_bus=?',id,
        (error, result) => {
            if (error) {
                console.log('Error al eliminar en la base de datos:', error);
            }else{
                
                res.send(result);
            }
            
        }
    );
});
app.put("/updateBus", (req, res) => {
    const id = req.body.id;
    const numeroBus = req.body.numeroBus;
    const placa = req.body.placa;
    const compania = req.body.companiaSeleccionada; 
    const lugares = req.body.lugares; 
    const lugaresString = lugares.join(',');
    db.query("UPDATE bus SET numeroBus=?, placa=?, lugares=? , compania=? WHERE id_bus=?",
        [numeroBus, placa, lugaresString, compania,id],
        (error, result) => {
            if (error) {
                console.log('Error al actualizar en la base de datos:', error);
            }else{
                res.send(result);
            }
            
        }
    );
});


app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
});
