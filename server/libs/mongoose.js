var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'),
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to the database');
        }
    });
module.exports = mongoose;