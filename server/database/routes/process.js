var Process = require('../models/process');
var fpCheck = require('../../middlewares/process').fpCheck;
var fpLastActionCheck = require('../../middlewares/process').fpLastActionCheck;
var denoise = require('../../middlewares/process').denoise;
var saveFile = require('../../libs/fileProcess').saveFile;
var sendFile = require('../../libs/fileProcess').sendFile;
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
    proc.use(fpLastActionCheck);
    proc.use(saveFile);
    proc.use(denoise);
    proc.use(fileProcess);
    proc.post('/', sendFile);
    proc.use(clean);
    return proc;
};