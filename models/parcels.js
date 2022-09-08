const mongoose = require('mongoose');

const parcelSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    sender: {type: mongoose.Types.ObjectId, ref: 'Sender'
    }, 
    address: {type: String, required: true},
    weight: {type: Number, required: true},
    fragile: {type: Boolean, required: true},
})

module.exports = mongoose.model('Parcel', parcelSchema);