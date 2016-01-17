require('mongoose');
var Contact = require('../models/contact.js');
module.exports = function(router)
{
    router.route('/contacts')

    .post(function(req, res) {
        
        var contact = new Contact();
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact._user_id = req.body.user_id;
        contact.phone = req.body.phone;
        contact.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Contact created!', contact: contact });
        });
    })

    .get(function(req, res) {
        Contact.find(function(err, contacts) {
            if (err)
                res.send(err);
            res.json(contacts);
        });
    });
}
