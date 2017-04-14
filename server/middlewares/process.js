var spawn = require('child_process').spawn;
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
exports.denoise = function (req, res, next) {
    var denoise = req.body.denoise;
    if (denoise) {
        console.log(denoise);
        var h = denoise.h;
        var templateWindowSize = denoise.templateWindowSize;
        var searchWindowSize = denoise.searchWindowSize;
        var py = spawn('python', ['denoise', '/tmp/' + req.fingerprint, h, templateWindowSize, searchWindowSize]);
        py.stderr.on('data', function (se) {
            console.log(`stderr: ${data}`);
        });
        py.stdout.on('end', function () { next(); });
    } else { next(); }
};