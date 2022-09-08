const {json} = require('express')
const mongoose = require('mongoose')

const Parcel = require('../models/parcels')
const Sender = require('../models/sender')

module.exports = {
    getAllParcelsByName: (req, res) => {
        Sender.find({name: req.params.name}).populate('parcels').exec((err, parcels) => {
            if(err) return res.status(400).json(err)
            if (!parcels) return res.status(404).json()
            res.json(parcels)
        })
    },
    createNewSender: (req, res) => {
        Sender.create(req.body, (err, sender) => {
            if(err) return res.status(400).json(err)
            res.json(sender)
        })
    },

    deleteById: (req, res) => {
        Sender.deleteById(req.body._id, (err,sender) =>{
            if(err) return res.status(400).json(err)
            res.json(sender)
        })
    },

    updateNameById: (req,res) => {
        Sender.findOneAndUpdate(
            {_id: req.body._id}, 
            {$set: {name: req.body.name}}, 
            (err, sender) => {
                if(err) return res.status(400).json(err)
                if (!sender) return res.status(404).json()
                res.json(sender)
            }
            )
    },

    addParcel: (req, res) => {
        let parcel = new Parcel(req.body.parcel)

        Sender.findById(req.body._id, (err, sender) =>{
            if(err) return res.status(400).json(err)
            if(!sender) return res.status(404).json();
            parcel.sender = sender
            parcel.save((err, p) =>{
                if (err) return res.status(400).json(err)
                sender.parcels.push(parcel)
                sender.save((err, sender) => {
                    if (err) return res.status(400).json(err)
                    res.json(sender)
                })
            })
        })
    }
}