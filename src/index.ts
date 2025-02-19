import express from "express";
import cors from 'cors';
const app = express();
app.use(cors());

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

import * as db from './db-connections';
import { reduceEachLeadingCommentRange } from "typescript";


// GETS


// GET para consneguir toda la informacion del usuario
app.get('/usuarios/:id_usuario', async (req, res) => {
    console.log(`Petición recibida al endpoint GET /usuarios/:id_usuario`)
    try {
        let query = `SELECT * FROM usuarios WHERE id_usuario='${req.params.id_usuario}'`;
        let db_response = await db.query(query);

        if(db_response.rows.length > 0){
            console.log(`Usuario encontrado: ${db_response.rows[0].id_usuario}`);
            res.json(db_response.rows[0]);   
        } else{
            console.log(`Usuario no encontrado.`)
            res.json(`Usuario no encontrado.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
     }
});

app.get('/leader_dinero', async (req, res) => {
    try {
        let query = `SELECT * FROM usuarios ORDER BY dinero DESC LIMIT 5`;
        let db_response = await db.query(query);

        if (db_response.rows.length > 0) {
            res.json(db_response.rows);
            console.log(db_response)
        } else {
            console.log("No se encontraron registros.");
            res.json("No se encontraron registros.");
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
     }
});

app.get('/leader_clicks', async (req, res) => {
    try {
        let query = `SELECT * FROM usuarios ORDER BY cantidad_clicks DESC LIMIT 5`;
        let db_response = await db.query(query);

        if (db_response.rows.length > 0) {
            res.json(db_response.rows);
            console.log(db_response)
        } else {
            console.log("No se encontraron registros.");
            res.json("No se encontraron registros.");
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
     }
});



// POSTS

// POST para crear usuarios
app.post('/usuarios', jsonParser, async (req, res) => {
    console.log(req.body)
    try {
        let query = `INSERT INTO usuarios VALUES ('${req.body.id_usuario}', '${req.body.username}', '${req.body.dinero}', '${req.body.cantidad_clicks}', '${req.body.cantidad_generada}', '${req.body.upgrade1}', '${req.body.upgrade2}');`;
        let db_response = await db.query(query);

        console.log(db_response);

        if(db_response.rowCount == 1){
            res.json(`El usuario ha sido registrado correctamente.`);
        } else{
            res.json(`El registro no ha sido registrado.`);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');

    }
});

// POST para actualizar el dinero del usuario
app.post('/dinero/:id_usuario', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint POST /dinero/:id_usuario`)
    try{
        let query = `UPDATE usuarios SET dinero = ${req.body.dinero} WHERE id_usuario = '${req.params.id_usuario}';`
        let db_response = await db.query(query);
        res.json("La cantidad de dinero ha sido actualizado");
        console.log("Dinero Updated")

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');

    }
});

// POST para actualizar los clicks totales del usuario
app.post('/clicks/:id_usuario', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint POST /clicks/:id_usuario`)
    try{
        let query = `UPDATE usuarios SET cantidad_clicks = ${req.body.cantidad_clicks} WHERE id_usuario = '${req.params.id_usuario}';`
        let db_response = await db.query(query);
        res.json("La cantidad de Clicks ha sido actualizada");
        console.log("Clicks Updated")

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');

    }
});

// POST para actualziar las mejoras del usuario.
app.post('/upgrade1/:id_usuario', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint /upgrade1/:id_usuario`)
    try{
        let query = `UPDATE usuarios SET upgrade1 = ${req.body.upgrade1} WHERE id_usuario = '${req.params.id_usuario}';`
        let db_response = await db.query(query);

        res.json("El nivel de mejora de upgrade1 ha sido actualizado.")
        console.log("Upgrade1 Updated")

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');

    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => 
    console.log(`App listening on PORT ${port}
    ENDPOINTS:
    - GET /usuarios/:id_usuario
    - POST /dinero/:id_usuario
    - POST /clicks/:id_usuario
    - POST /usuarios`));