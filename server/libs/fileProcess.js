var exec = require('child_process').exec;
var sme = require('./sme').sme;

var path = require('path');
var mime = require('mime');
var fs = require('fs');
var base64 = require('base64-stream');
exports.fileProcess = function (fName, res) {
    var command = 'cd ' + __dirname + ' && python colorize.py -img_in ' + fName + ' -img_out ' + fName + '.out.png'
    exec(command, { maxBuffer: 20000 * 1024 }, function (e, so, se) {
        if (e) {
            console.log(e);
        } else {
            var encode = base64.encode();
            var file = fName + '.out.png';
            var filename = path.basename(file);
            var mimetype = mime.lookup(file);
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
            var filestream = fs.createReadStream(file);
            filestream.pipe(encode).pipe(res);
        }
    });
};
exports.clean = function (req, res) {
    var command = 'rm -rf ' + req.userFolder + '/*';
    exec(command, { maxBuffer: 20000 * 1024 }, function (e, so, se) {
        if (e) {
            res.json(e);
        } else {
            res.json(sme(true, 'files_deleted', null));
        }
    });
};