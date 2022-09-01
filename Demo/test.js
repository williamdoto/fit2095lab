const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
let warehouse;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        warehouse = client.db("warehouse");
        warehouse.collection("products")
        // warehouse.collection('products').insertOne({name: "Robot", quantity: 2, cost: 219, origin: "Australia"});
    }
})

function findAustralia(){
    let query = { origin: 'Australia' };
    warehouse.collection("products").find(query).limit(3).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}

function product300(){
    let query = { cost: {$lt: 300} };
    warehouse.collection("products").find(query).limit(3).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}

function decreasePegboard(){
    warehouse.collection("products").updateMany({ name: 'Pegboard' }, { $inc: { quantity: -1 } }, function (err, result) {
    });
}

function zeroQuantity(){
    warehouse.collection("products").deleteMany({quantity: 0}, function (err, obj) {
        console.log(obj.result);
      });
}




