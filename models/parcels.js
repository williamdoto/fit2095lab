const mongoose = require('mongoose');

const parcelSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    id: {type: Number, required: true}, 
    sender: {type: String, required: true, validate:{
        validator: function(sender){
            return(sender.length >= 3)
        },
        message: "Sender must be more than the length of 3"
    }
}, 
    address: {type: String, required: true, validate:{
        validator: function(address){
            return(address.length >= 3)
        },
        message: "Address must be more than the length of 3"
    }},
    weight: {type: Number, required: true,  validate:{
        validator: function(weight){
            return(weight > 0)
        },
        message: "Weight must be more than 0"
    }},
    fragile: Boolean,
    type: String
})

module.exports = mongoose.model('Parcel', parcelSchema);