var uuidV4 = require('uuid/v4');
var spawn = require('child_process').spawn;
var sme = require('../libs/sme').sme;
exports.makeUid = function (req, res, next) {
    var denoise = req.get('denoise');
    var normalize = req.get('normalize');
    if (denoise) { req.denoise = denoise; }
    if (normalize) { req.normalize = normalize; }
    req.uid = uuidV4();
    next();
};
exports.denoise = function (req, res, next) {
    var denoise = req.denoise;
    if (denoise) {
        var py = spawn('python', ['denoise.py', '/tmp/' + req.uid + '.png']);
        py.stderr.on('data', function (se) {
            console.log(`stderr: ${se}`);
        });
        py.stdout.on('end', function () { next(); });
    } else { next(); }
};
exports.normalize = function (req, res, next) {
    var normalize = req.normalize;
    if (normalize) {
        var py = spawn('python', ['normalize.py', '/tmp/' + req.uid + '.png']);
        py.stderr.on('data', function (se) {
            console.log(`stderr: ${se}`);
        });
        py.stdout.on('end', function () { next(); });
    } else { next(); }
};