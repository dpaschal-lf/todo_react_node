const express = require('express');
const path = require('path');
const cors = require('cors');

const server = express();

const staticModule = express.static(path.normalize(__dirname+'../public'));
const bodyParser = express.bodyParser();

server.use( staticModule );
server.use( cors() );
server.use( bodyParser.json({ extended: false}) );

const mysql = require('mysql');
const mysqlCredentials = require('./credentials.js');
const db = mysql.createConnection( mysqlCredentials );

server.get('/api/items', (req,res)=>{
    db.connect( (error)=>{
        if(error){
            res.sendStatus(500).send( error.message );
            return;
        }
        const query = 'SELECT `title`, `added`, `id`, `completed` FROM `items`';
        db.query( query, (error, data) =>{
            if(!error){
                res.send(data);
            } else {
                res.sendStatus(500).send(error);
            }
        });
    });
})

server.get('/api/items/:id', (req,res)=>{
    db.connect( (error)=>{
        if(error){
            res.sendStatus(500).send( error.message );
            return;
        }
        if(isNaN(req.params.id)){
            res.sendStatus(500).send( `id ${req.params.id} is not a number` );
        }
        const query = 'SELECT `title`, `added`, `id`, `completed`, `description` FROM `items` WHERE `id`=?';
        db.query( query, [req.params.id], (error, data) =>{
            if(!error){
                res.send(data);
            } else {
                res.sendStatus(404).send(`cannot find record for id ${req.params.id}`)
            }
        });
    });
})

server.delete('/api/items/:id', (req,res)=>{
    db.connect( (error)=>{
        if(error){
            res.sendStatus(500).send( error.message );
            return;
        }
        if(isNaN(req.params.id)){
            res.sendStatus(500).send( `id ${req.params.id} is not a number` );
        }
        const query = 'DELETE FROM `items` WHERE `id`=?';
        db.query( query, [req.params.id], (error) =>{
            console.log('delete: ',error);
            if(!error){
                res.send(200);
                return;
            } 
            res.send(500);
        });
    });
})

server.post('/api/items/', (req,res)=>{
    db.connect( (error)=>{
        const requiredFields = ['title','description'];
        for( let fieldIndex = 0; fieldIndex < requiredFields.length; fieldIndex++){
            if(req.body[requiredFields[fieldIndex]]===undefined){
                res.sendStatus(500).send(`${requiredFields[fieldIndex]} is required`);
                return;
            }
        }

        const query = 'DELETE FROM `items` WHERE `id`=?';
        db.query( query, [req.params.id], (error) =>{
            console.log('delete: ',error);
            if(!error){
                res.send(200);
                return;
            } 
            res.send(500);
        });
    });
})

server.listen(5000, ()=>{
    console.log('server operational');
})