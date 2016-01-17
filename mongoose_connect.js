var mongoose = require('mongoose');
if (typeof process.env.MONGOLAB_URI !== 'undefined'){
	//production
	mongoose.connect(process.env.MONGOLAB_URI);
}
else{
	//development
	mongoose.connect('mongodb://localhost/test');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("connected to database '" + db.name + "'");
});
module.exports = mongoose;
