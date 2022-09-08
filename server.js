'use strict';
const path = require('path')
let morgan = require('morgan');
const express = require('express')
const mongodb = require('mongodb');
let app = express()

app.use("css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));

app.use(express.static('public'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static("images"));
app.use(express.static("css"));
const Parcel = require('./routers/parcel');
const Sender = require('./routers/sender');
const { default: mongoose } = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/senders'

app.listen(8080)

mongoose.connect(dbUrl, function(err) {
    if(err === null){
        console.log("Connected")
    }
    else {
        console.log("Can't connect")
    }
})

app.get('/sender/:id', Sender.getAllParcelsByName)
app.post('/createNewSender', Sender.createNewSender)
app.delete('/deleteById', Sender.deleteById)
app.put('/updateNameById', Sender.updateNameById)
app.put('/addParcel/parcels', Sender.addParcel)

app.get('/parcels', Parcel.getAllByAddress)
app.put('/updateAddressById', Parcel.updateAddressById)
