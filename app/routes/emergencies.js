require('mongoose');
var twilio_creds = require('../../twilio_credential.js');
var twilio = require('twilio')(twilio_creds.twilio_sid, twilio_creds.twilio_auth_token);
var Emergency = require('../models/emergency.js');
var User = require('../models/user.js');
var Contact = require('../models/contact.js');
module.exports = function(router)
{
    router.route('/emergencies')

    .post(function(req, res) {
        
        var emergency = new Emergency();
        emergency.location = req.body.location;
        emergency.call_date = new Date();
        emergency._user_id = req.body.user_id;
        User.findById(emergency._user_id, function(err, user){
            emergency.user = user;
            console.log(user);
        });
        var contactString = "";
        var contactArray = Contact.find({_user_id : emergency._user_id}, function(err, contacts){
            if (!err){
                contacts.forEach(function(contact){
                    contactString += contact.name; 
                    if (contact != contacts[contacts.length - 1])
                        contactString += ', ';
                });
            }
            else
                console.log(err);
        });
        
        emergency.save(function(err) {
            if (err)
                res.send(err);
            //set up for demo
            var numbers = ['12892301213', '16475308266'];
            numbers.forEach(function(number){
                twilio.sendMessage({
                to: '+' + number,
                from: twilio_creds.twilio_phone_number,
                body: emergency.user.name + ' is demoing the 911 button.  They have dialed 911. The contacts we would have messaged are ' + contactString + '.'
            }, 
            function (err, responseData){
                if(!err){
                    console.log("Message successful");
                }
                else{
                    console.log(err);
                }
            });
        });
            
            res.json({ message: 'Emergency created!', emergency: emergency });
        });
    })

    .get(function(req, res) {
        Emergency.find(function(err, emergencies) {
            if (err)
                res.send(err);

            res.json(emergencies);
        });
    });
}
