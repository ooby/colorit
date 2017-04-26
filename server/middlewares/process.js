var uuidV4 = require('uuid/v4');
var spawn = require('child_process').spawn;
var sme = require('../libs/sme').sme;
exports.makeUid = function (req, res, next) {
    req.uid = uuidV4();
    next();
};
exports.denoise = function (req, res, next) {
    var denoise = req.body.denoise;
    if (denoise) {
        console.log(denoise);
        var h = denoise.h;
        var templateWindowSize = denoise.templateWindowSize;
        var searchWindowSize = denoise.searchWindowSize;
        var py = spawn('python', ['denoise', '/tmp/' + req.uid, h, templateWindowSize, searchWindowSize]);
        py.stderr.on('data', function (se) {
            console.log(`stderr: ${data}`);
        });
        py.stdout.on('end', function () { next(); });
    } else { next(); }
};