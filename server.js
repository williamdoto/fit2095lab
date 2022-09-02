'use strict';
const path = require('path')
let morgan = require('morgan');
const express = require('express')
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/';
let app = express()

app.use("css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));

app.use(express.static('public'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('tiny'));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// parse application/json
app.use(express.json())
//Setup the static assets directories
app.use(express.static("images"));
app.use(express.static("css"));
const Parcel = require('./models/parcels');
const { default: mongoose } = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/pomsDB'
let db;

app.listen(8080)

mongoose.connect(dbUrl, function(err) {
    if(err === null){
        console.log("Connected")
    }
})

// MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
//     if (err) {
//         console.log('Err  ', err);
//     } else {
//         console.log("Connected successfully to server");
//         db = client.db("database");
//         db.collection("parcels")
//         // warehouse.collection('products').insertOne({name: "Robot", quantity: 2, cost: 219, origin: "Australia"});
//     }
// })
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/home.html'))
})

// app.get('/addparcel', function(req,res){
//     let sender = req.query['sender']
//     let address = req.query['address']
//     let weight = parseFloat(req.query['weight'])
//     let fragile = (req.query['fragile'] == 'true')
//     let id = createID()
//     let objec = {id: id, sender: sender, address: address, weight: weight, fragile: fragile}
//     db.collection('parcels').insertOne(objec);
//     res.send("Successful Insertion!")
//     res.render('listparcel.html', {db: db});
// })

app.get('/addparcelhome', function(req, res){
    res.sendFile(path.join(__dirname, '/views/newparcel.html'))
})

app.post('/data', function(req,res){
        let objec = new Parcel({id: createID(), sender: req.body.sender, address: req.body.address, weight: parseInt(req.body.weight), fragile: (req.body.fragile == "on" ? true : false), type: req.body.type})
        objec.save(function(err){
            if(err){
                res.sendFile(path.join(__dirname, '/views/invalid.html'))
                console.log('Cant save' + err)
            }
            else 
            {console.log('Successfully saved');
            Parcel.find({}, function(err,docs){
                if(err){
                console.log("Listing Error")}
                else{
                res.render('listparcel.html', {db: docs})}
            })
        }
        })
})

app.get('/updatehome', function(req, res){
    res.sendFile(path.join(__dirname, '/views/update.html'))
})
app.post('/update', function(req,res){
        Parcel.findByIdAndUpdate(req.body.id, {sender: req.body.sender, address: req.body.address, weight: req.body.weight, fragile: (req.body.fragile == "on" ? true : false), type: req.body.type}, function (err, result) {
            if(err){
                res.sendFile(path.join(__dirname, '/views/invalid.html'))
                console.log('Cant Update' + err)
            }
            else 
            {console.log('Successfully saved');
            Parcel.find({}, function(err,docs){
                if(err){
                console.log("Listing Error")}
                else{
                res.render('listparcel.html', {db: docs})}
            })
        }
        });
})

app.get('/deletehome', function(req, res){
    res.sendFile(path.join(__dirname, '/views/deletion.html'))
})

app.post('/delete', function(req,res){
    let idfunc = (id) => { 
        Parcel.deleteOne({id: id}, function (err, obj) {
            if(err){
                res.sendFile(path.join(__dirname, '/views/invalid.html'))
                console.log('Cant Update' + err)
            }
            else 
            {console.log('Successfully saved');
            Parcel.find({}, function(err,docs){
                if(err){
                console.log("Listing Error")}
                else{
                res.render('listparcel.html', {db: docs})}
            })
        }
        })
    }
    let senderfunc = (sender) => {         
        Parcel.deleteMany({sender: sender}, function (err, obj) {
            if(err){
                res.sendFile(path.join(__dirname, '/views/invalid.html'))
                console.log('Cant Update' + err)
            }
            else 
            {console.log('Successfully saved');
            Parcel.find({}, function(err,docs){
                if(err){
                console.log("Listing Error")}
                else{
                res.render('listparcel.html', {db: docs})}
            })
        }
        })
    }
    
    req.body.type === "ID" ? idfunc(req.body.idsender) : senderfunc(req.body.idsender)
})

app.get('/delete2home', function(req, res){
    res.sendFile(path.join(__dirname, '/views/deletion2.html'))
})

app.post('/delete2', function(req,res){
    Parcel.deleteMany({sender: req.body.sender, weight: parseInt(req.body.weight)}, function (err, obj) {
        if(err){
            res.sendFile(path.join(__dirname, '/views/invalid.html'))
            console.log('Cant Update' + err)
        }
        else 
        {console.log('Successfully saved');
        Parcel.find({}, function(err,docs){
            if(err){
            console.log("Listing Error")}
            else{
            res.render('listparcel.html', {db: docs})}
        })
    }
    })
})

app.get('/delete3home', function(req, res){
    res.sendFile(path.join(__dirname, '/views/deletion3.html'))
})

app.post('/delete3', function(req,res){
    Parcel.deleteMany({weight: parseInt(req.body.weight), fragile: req.body.fragile == "on" ? true : false}, function (err, obj) {
        if(err){
            res.sendFile(path.join(__dirname, '/views/invalid.html'))
            console.log('Cant Update' + err)
        }
        else 
        {console.log('Successfully saved');
        Parcel.find({}, function(err,docs){
            if(err){
            console.log("Listing Error")}
            else{
            res.render('listparcel.html', {db: docs})}
        })
    }
    })
})

app.get('/insertion', function(req,res){
    res.render('insertion.html', {input: db[-1]});
})

app.get('/getparcelshome', function(req,res){
    Parcel.find({}, function(err,docs){
        if(err){
        console.log("Listing Error")}
        else{
        res.render('listparcel.html', {db: docs})}
    })
})
app.get('/listsenderhome', function(req,res){
    res.sendFile(path.join(__dirname, '/views/listsender.html'))
})

app.post('/listsender', function(req,res){

    Parcel.find({sender: req.body.sender}, function(err,docs){
        if(err){
        console.log("Listing Error")}
        else{
        res.render('listparcel.html', {db: docs})}
    })
})

app.get('/listweighthome', function(req,res){
    res.sendFile(path.join(__dirname, '/views/listweight.html'))
})

app.post('/listweight', function(req,res){
    Parcel.where('weight').gte(String(req.body.weight1)).lte(String(req.body.weight2)).exec(function(err,docs){
        if(err){
        console.log("Listing Error")}
        else{
        res.render('listparcel.html', {db: docs})}
    })
})

// app.get('/gettotalweight', function(req,res){
//     if (db.length === 0){
//         res.send("The Parcel Database is empty, please fill in some data first.")
//     }
//     else {
//     res.send("The total weight of the parcels is: " + String(db.map(x => parseFloat(x.weight)).reduce((a,b)=> a+b)) + " kg.")
//     }
// })

// app.get('/deleteid/:id', function(req,res){
//     let id = parseInt(req.params.id)
//     db = db.filter((element) => element.id != id)
//     db.collection("products").deleteOne({id: id}, function (err, obj) {console.log(obj.result);});
//     res.send("Successful Deletion!")
// })

// app.get('/get/smallparcels', function(req,res){
//     if (db.length == 0){
//         res.send("The database is empty")
//     }
//     let smallDB = db.filter((element) => element.weight < 1.5)
//     res.send("The amount of parcels with a weight of less than 1.5 kg is: ${smallDB.length}")
// })

// app.get('/get/fragileparcels', function(req,res){
//     if (db.length == 0){
//         res.send("The database is empty")
//     }
//     let fragileDB = db.filter((element) => element.fragile == true)
//     res.send("The amount of parcels with a weight of less than 1.5 kg is: " + String(fragileDB.length))
// })

app.use(function(req,res,next){
    res.status(404)
    res.sendFile(path.join(__dirname, '/views/error.html'))
})

function createID(){
    let tempID = Math.floor(Math.random() * 1000)
    // let arrayLength = db.collection("parcels").find({id: tempID}).limit(1).size
    // while (arrayLength !== 0){
    //     tempID = Math.floor(Math.random() * 1000)
    //     arrayLength = db.collection("parcels").find({id: tempID}).limit(1).size
    // }
    console.log("dEEZ")
    return tempID
}

// function generateList() {
//     let st = 'ID  Name  Address  Weight  Fragile  </br>';
//     for (let i = 0; i < db.length; i++) {
//         st += db[i].id + ' | ' + db[i].sender + ' | ' + db[i].address + ' | ' + db[i].weight + ' | ' + db[i].fragile +'</br>';
//     }
//     return st;
// }
