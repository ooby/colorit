var Process = require('../database/models/process');
var sme = require('../libs/sme').sme;
exports.fpCheck = function (req, res, next) {
    var fp = req.headers['fingerprint'];
    if (!fp) { res.status(403).json(sme(false, 'authentication_error', null)); }
    else { req.fingerprint = fp; next(); }
};
exports.fpLastActionCheck = function (req, res, next) {
    if (Process.checkTime(req.fingerprint)) { next(); }
    else { res.json(sme(false, 'too_early', Process.getDelta(req.fingerprint))); }
};