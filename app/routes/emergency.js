require('mongoose');
var Emergency = require('../models/emergency.js');
module.exports = function(router){
	router.route('/emergencies/:emergency_id')

    .get(function(req, res) {
        Emergency.findById(req.params.emergency_id, function(err, emergency) {
            if (err)
                res.send(err);
            res.json(emergency);
        });
    })

    .put(function(req, res) {

        Emergency.findById(req.params.emergency_id, function(err, emergency) {

            if (err)
                res.send(err);

            emergency.name = req.body.name;
            emergency.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Emergency updated!', emergency: emergency });
            });

        });
    })

    .delete(function(req, res) {
        Emergency.remove({
            _id: req.params.emergency_id
        }, function(err, emergency) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted', deleted: emergency });
        });
    });
}