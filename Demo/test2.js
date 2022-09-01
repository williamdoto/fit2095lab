'use strict';
const path = require('path')
let morgan = require('morgan');
const express = require('express')
let app = express()
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
let warehouse;
const url = "mongodb://10.152.168.99:27017"; // replace with localhost for debugging or if it doesnt work.
app.use(express.static('public'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.listen(9033)

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    console.log("Deez");
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        warehouse = client.db("warehouse");
        warehouse.collection("products")
    }
})

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/test2.html'))
})

app.post('/productpost', function(req,res){
        warehouse.collection('products').insertOne({name: req.body.name, quantity: req.body.quantity, cost: req.body.cost, origin: req.body.origin});
})

