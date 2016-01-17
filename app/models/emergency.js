var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmergencySchema = new Schema({
    _user_id: Schema.Types.ObjectId,
    location: String,
    call_date: Date
});

module.exports = mongoose.model('Emergency', EmergencySchema);