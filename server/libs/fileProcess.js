var spawn = require('child_process').spawn;
var sme = require('./sme').sme;
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var base64 = require('base64-stream');
exports.saveFile = function (req, res, next) {
    var busboy = new require('busboy')({ headers: req.headers });
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        var saveTo = path.join('/tmp', req.fingerprint);
        file.pipe(fs.createWriteStream(saveTo));
    });
    req.pipe(busboy);
    busboy.on('finish', function () { next(); });
};
exports.fileProcess = function (req, res, next) {
    var arg = ['colorize.py', '/tmp/' + req.fingerprint, '/tmp/' + req.fingerprint + '.out.png'];
    var py = spawn('python', arg);
    py.stderr.on('data', function (se) { });
    py.stdout.on('end', function () { next(); });
};
exports.sendFile = function (req, res, next) {
    var encode = base64.encode();
    var file = '/tmp/' + req.fingerprint + '.out.png';
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
    var filestream = fs.createReadStream(file);
    filestream
        .pipe(encode)
        .pipe(res);
        /*.on('finish', function () {
            next();
        });*/
};
exports.clean = function (req, res, next) {
    setTimeout(function () {
        var rm = spawn('rm', ['-f', '/tmp/' + req.fingerprint, '/tmp/' + req.fingerprint + '.out.png']);
        rm.stderr.on('data', function (se) { });
        rm.stdout.on('end', function () { });
    }, 20000);
};