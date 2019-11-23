const express = require('express');
const path = require('path');
const cors = require('cors');

const server = express();

const staticModule = express.static(path.normalize(__dirname+'../public'));

server.use( staticModule );
server.use( cors() );

const mysql = require('mysql');
const mysqlCredentials = require('./credentials.js');
const db = mysql.createConnection( mysqlCredentials );

server.get('/api/items', (req,res)=>{
    db.connect( (error)=>{
        if(error){
            res.status(500).send( error.message );
            return;
        }
        const query = 'SELECT `title`, `added`, `id`, `completed` FROM `items`';
        db.query( query, (error, data) =>{
            if(!error){
                res.send(data);
            } else {
                res.status(500).send(error);
            }
        });
    });
})

server.get('/api/items/:id', (req,res)=>{
    db.connect( (error)=>{
        if(error){
            res.status(500).send( error.message );
            return;
        }
        if(isNaN(req.params.id)){
            res.status(500).send( `id ${req.params.id} is not a number` );
        }
        const query = 'SELECT `title`, `added`, `id`, `completed`, `description` FROM `items` WHERE `id`=?';
        db.query( query, [req.params.id], (error, data) =>{
            if(!error){
                res.send(data);
            } else {
                res.status(404).send(`cannot find record for id ${req.params.id}`)
            }
        });
    });
})

server.delete('/api/items/:id', (req,res)=>{
    db.connect( (error)=>{
        if(error){
            res.status(500).send( error.message );
            return;
        }
        if(isNaN(req.params.id)){
            res.status(500).send( `id ${req.params.id} is not a number` );
        }
        const query = 'DELETE FROM `items` WHERE `id`=?';
        db.query( query, [this.params.id], (error, data) =>{
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