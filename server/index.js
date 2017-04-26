var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var http = require('http');
var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' }));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(morgan('tiny'));

var process = require('./database/routes/process')(express);
app.use('/api/process', process);

var port = 3000;
server.listen(port, function (e) {
    if (e) { console.log(e); }
    else { console.log('listening on port', port); }
});