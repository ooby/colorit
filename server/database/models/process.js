var mongoose = require('mongoose');
var config = require('../../config');
var delay = config.get('delay');

var Schema = mongoose.Schema;

var procSchema = new Schema({
    fingerprint: { type: String },
    lastAction: { type: Date },
    created: { type: Date, default: Date.now }
});

procSchema.statics.checkTime = function (fp) {
    var proc = this.findOne({ fingerprint: fp });
    if (proc) {
        var la = (proc.lastAction) ? proc.lastAction : 0;
        var delta = Date.now() - la;
        return (delta >= delay) ? true : false;
    } else {
        return false;
    }
};

procSchema.statics.getDelta = function (fp) {
    var proc = this.findOne({ fingerprint: fp });
    return Date.now() - proc.lastAction;
};

module.exports = mongoose.model('Process', procSchema);