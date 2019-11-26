const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const validateUser = require('./validateuser.js');

const server = express();

const mysql = require('mysql');
const mysqlCredentials = require('./credentials.js');
const db = mysql.createConnection( mysqlCredentials );

const staticModule = express.static(path.normalize(__dirname+'../public'));
//const bodyParser = express.bodyParser();
server.use( (req, res, next )=>{
    req.db = db;
    next();
})
//yes, I know cors also does this, as illustrated below.
server.use( (req, res, next)=>{
    res.header('Access-Control-Expose-Headers','userToken');
    next();
})

server.use( staticModule );
server.use( cors() );
// server.use(cors({
//     exposedHeaders: ['userToken'],
//   }));
server.use( bodyParser.json() );
server.use( validateUser );
server.use(function (err, req, res, next) {
    try{
        throw new Error(err);
    } catch(error){
        res.status(500).send('error in middleware -  ' + error);
        console.log('error in middleware -  ' + error);
    }
});



server.get('/api/items', (req,res)=>{
    const query = 'SELECT `title`, `added`, `id`, `completed` FROM `items` WHERE userID=?';
    req.db.query( query, [req.userID], (error, data) =>{
        if(!error){
            res.send(data);
        } else {
            res.status(500).send(error);
        }
    });
})

server.get('/api/items/:id', (req,res)=>{

    if(isNaN(req.params.id)){
        res.status(500).send( `id ${req.params.id} is not a number` );
    }
    const query = 'SELECT `title`, `added`, `id`, `completed`, `description` FROM `items` WHERE `id`=? AND `userID`=?';
    req.db.query( query, [req.params.id, req.userID], (error, data) =>{
        if(!error){
            res.send(data[0]);
        } else {
            res.status(404).send(`cannot find record for id ${req.params.id}`)
        }
    });
})

server.delete('/api/items/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.status(500).send( `id ${req.params.id} is not a number` );
    }
    const query = 'DELETE FROM `items` WHERE `id`=? AND `userID`=?';
    req.db.query( query, [req.params.id, req.userID], (error) =>{
        if(!error){
            res.sendStatus(200);
            return;
        } 
        res.sendStatus(500);
    });
})

server.post('/api/items/', (req,res)=>{  
    const requiredFields = ['title','description'];
    for( let fieldIndex = 0; fieldIndex < requiredFields.length; fieldIndex++){
        if(req.body[requiredFields[fieldIndex]]===undefined){
            res.status(500).send(`${requiredFields[fieldIndex]} is required`);
            return;
        }
    }
    const query = 'INSERT INTO `items` SET `title`=?, `description`=?, `userID`=?, `added`=NOW(), `completed`="active"';
    req.db.query( query, [req.body.title, req.body.description,req.userID], (error) =>{
        if(!error){
            res.sendStatus(200);
            return;
        } 
        res.sendStatus(500);
    });
})

server.put('/api/items/:id', (req,res)=>{
    if(isNaN(req.params.id)){
        res.status(500).send( `id ${req.params.id} is not a number` );
    }
    const changeableFields = ['title','description', 'completed'];
    let query = 'UPDATE `items` SET ';
    const validFields = changeableFields.filter( field=> req.body.hasOwnProperty(field));
    const validValues = [];
    if(validFields.length===0){
        res.status(500).send('data must haveat least 1 field to change');
        return;
    }
    validFields.forEach( field => {
        query += '`'+field+'`=?,';
        validValues.push( req.body[field]);
    });
    query = query.slice(0,-1) + ' WHERE `id` = ?';
    validValues.push(req.params.id);
    req.db.query( query, validValues , (error) =>{
        if(!error){
            res.sendStatus(200);
            return;
        } 
        res.status(500).send(error);
    });
})

server.listen(5000, ()=>{
    console.log('server operational');
})