var Process = require('../models/process');
var fpCheck = require('../../middlewares/process').fpCheck;
var lastActionCheck = require('../../middlewares/process').fpLastActionCheck;
var fileProcess = require('../../libs/fileProcess').fileProcess;
var clean = require('../../libs/fileProcess').clean;
var sme = require('../../libs/sme').sme;

var async = require('async');

module.exports = function (express) {
    var proc = express.Router();
    proc.use(fpCheck);
    proc.get('/', function (req, res) {
        async.waterfall([
            function (cb) {
                Process.findOne({ fingerprint: req.fingerprint }, cb);
            },
            function (p, cb) {
                if (p) { cb(null, sme(true, 'fingerprint', p)); }
                else {
                    var prc = new Process({ fingerprint: req.fingerprint });
                    prc.save(function (e) {
                        if (e) { cb(e); }
                        else { cb(null, sme(true, 'fingerprint', prc)); }
                    });
                }
            }
        ], function (e, m) {
            if (e) { res.json(e); }
            else { res.json(m); }
        });
    });
    proc.use(lastActionCheck);
    proc.post('/', function (req, res) {
        var busboy = new require('busboy')({ headers: req.headers });
        var fs = require('fs');
        var path = require('path');
        var os = require('os');
        var fName;
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            var saveTo = path.join(os.tmpDir(), req.fingerprint);
            fName = saveTo;
            file.pipe(fs.createWriteStream(fName));
        });
        req.pipe(busboy);
        busboy.on('finish', function () {
            fileProcess(fName, res);
        });
    });
    proc.delete('/', clean);
    return proc;
};