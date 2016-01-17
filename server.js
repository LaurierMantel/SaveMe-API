// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('./mongoose_connect.js');

var Emergency = require('./app/models/emergency');
var User = require('./app/models/user');
var Contact = require('./app/models/contact');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();  
app.use('/api', router);

router.use(function(req, res, next){
	console.log("middleware");
	next();
});
require('./app/routes/emergencies.js')(router);
require('./app/routes/emergency.js')(router);
require('./app/routes/contacts.js')(router);
require('./app/routes/contact.js')(router);
require('./app/routes/users.js')(router);
require('./app/routes/user.js')(router);


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.listen(port);
console.log('SaveMeApi running on ' + port);
