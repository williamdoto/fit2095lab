const mongoose = require('mongoose');

const senderSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    name: {type: String, required: true
    }, 
    parcels: [{type: mongoose.Types.ObjectId,
        ref: 'Parcel'
    }],
})

module.exports = mongoose.model('Sender', senderSchema);