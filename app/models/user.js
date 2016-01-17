var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    join_date: Date,
    device_id: String
});

module.exports = mongoose.model('User', UserSchema);
