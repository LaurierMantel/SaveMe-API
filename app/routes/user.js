require('mongoose');
var User = require('../models/user.js');

module.exports = function(router){
	router.route('/users/:user_id')

    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    .put(function(req, res) {

        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);
            user.name = req.body.name;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'User updated!', user: user });
            });

        });
    })

    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted', deleted: user });
        });
    });
}