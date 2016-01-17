require('mongoose');
var User = require('../models/user.js');
module.exports = function(router)
{
    router.route('/users')

    .post(function(req, res) {
        
        var user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.join_date = new Date();
        user.device_id = req.body.device_id;
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User created!', user: user });
        });
    })

    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });
}
