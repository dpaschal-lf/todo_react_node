const express = require('express');
const mysql = require('mysql');
const path = require('path');

const server = express();

const staticModule = express.static(path.normalize(__dirname+'../public'));

server.use( staticModule );

server.get('/api/items', (req,res)=>{
    res.send([{"title":"this is a test todo in mysql","added":"2019-05-02 00:00:00","id":"1","completed":"active"},{"title":"get eggs","added":"2019-07-02 00:00:00","id":"2","completed":"completed"},{"title":"test2","added":"2019-11-20 19:24:41","id":"3","completed":"completed"},{"title":"make an example","added":"2019-11-20 19:25:59","id":"4","completed":"completed"}]);
})

server.listen(5000, ()=>{
    console.log('server operational');
})