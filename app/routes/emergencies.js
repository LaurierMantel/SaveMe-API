require('mongoose');
if(typeof process.env.TWILIO_SID !== 'undefined')
    var twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN); //production
else{
    //development; credentials are kept locally.
    var twilio_creds = require('../../twilio_credential.js');
    var twilio = require('twilio')(twilio_creds.twilio_sid, twilio_creds.twilio_auth_token);
}

var Emergency = require('../models/emergency.js');
var User = require('../models/user.js');
var Contact = require('../models/contact.js');

module.exports = function(router)
{
    router.route('/emergencies')

    .post(function(req, res, next) {
        
        var emergency = new Emergency();
        emergency.location = req.body.location;
        emergency.call_date = new Date();
        emergency._user_id = req.body.user_id;
        console.log("emergency : " + emergency);
        User.findById(emergency._user_id).exec()
        .then(function(user){
            console.log("user : " + user);
            return user;
        })
        .then(function(queryUser){
            if (queryUser !== null && queryUser !== undefined){
                console.log("queryUser: " + queryUser)
                var contactString = "";

                Contact.find({_user_id : emergency._user_id}, function(err, contacts){
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
                var fromNumber = process.env.TWILIO_DEMO_PHONE_NUMBER || twilio_creds.twilio_phone_number;

                emergency.save(function(err) {
                    if (err)
                        res.send(err);
                    //set up for demo
                    var numbers = ['12892301213', '16475308266'];
                    numbers.forEach(function(number){
                        twilio.sendMessage({
                        to: '+' + number,
                        from: fromNumber,
                        body: queryUser.name + ' is demoing the 911 button.  They have dialed 911. The contacts we would have messaged are ' + contactString + '.'
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
            }
            else{
                res.json({response: "that user is null"});
            }
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
