const mongoose = require('mongoose');

const privateMessageSchema = new mongoose.Schema({
    from_user: {
        type: String,
        required: true
    },
    to_user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date_sent: {
        type: Date,
    }
});

module.exports = mongoose.model("privateMessage", privateMessageSchema);