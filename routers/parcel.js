const mongoose = require('mongoose')

const Parcel = require('../models/parcels')
const Sender = require('../models/sender')

module.exports = {
    getAllByAddress: (req,res) =>{
        Parcel.find({address: req.query.address}, (err,parcels) => {
            if(err) res.status(400).json(err)
            res.json(parcels)
        })
    },

    updateAddressById: (req,res) => {
        Parcel.findByIdAndUpdate(req.body._id, {address: req.body.address}, (err, docs) => {
            if (err) res.status(400).json(err)
            if(!docs) res.status(404).json(err)
            res.send("Successful Update!")
        })
    }
}