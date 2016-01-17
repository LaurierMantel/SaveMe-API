var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
	_user_id: Schema.Types.ObjectId,
    name: String,
    email: String,
    phone: String
});

module.exports = mongoose.model('Contact', ContactSchema);