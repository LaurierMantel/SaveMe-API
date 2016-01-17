require('mongoose');
var Contact = require('../models/contact.js');

module.exports = function(router){
	router.route('/contacts/:contact_id')

    .get(function(req, res) {
        Contact.findById(req.params.contact_id, function(err, contact) {
            if (err)
                res.send(err);
            res.json(contact);
        });
    })

    .put(function(req, res) {

        Contact.findById(req.params.contact_id, function(err, contact) {

            if (err)
                res.send(err);
            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Contact updated!', contact: contact });
            });

        });
    })

    .delete(function(req, res) {
        Contact.remove({
            _id: req.params.contact_id
        }, function(err, contact) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted', deleted: contact });
        });
    });
}