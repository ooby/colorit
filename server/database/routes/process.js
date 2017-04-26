var makeUid = require('../../middlewares/process').makeUid;
var denoise = require('../../middlewares/process').denoise;
var saveFile = require('../../libs/fileProcess').saveFile;
var sendFile = require('../../libs/fileProcess').sendFile;
var fileProcess = require('../../libs/fileProcess').fileProcess;
var clean = require('../../libs/fileProcess').clean;
var sme = require('../../libs/sme').sme;

module.exports = function (express) {
    var proc = express.Router();
    proc.use(makeUid);
    proc.use(saveFile);
    proc.use(denoise);
    proc.use(fileProcess);
    proc.post('/', sendFile);
    proc.use(clean);
    return proc;
};