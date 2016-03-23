var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var log4js = require('log4js');
var fs = require('fs');
var nconf = require('nconf');

var access_log_path = nconf.get('access_log').path;
var app_log_path = nconf.get('app_log').path;

log4js.clearAppenders();
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(access_log_path), 'ACCESS_LOG');
log4js.addAppender(log4js.appenders.file(app_log_path), 'APP_LOG');

var logger = log4js.getLogger('APP_LOG');

var app = new express();

var router = require('./route.js');

var port = nconf.get('server').port;

var secert = nconf.get('server').secret;

app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(log4js.connectLogger(log4js.getLogger('ACCESS_LOG'), {
    level: 'auto'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser(secert));

app.use('/', router);

var listen = app.listen(port);

logger.info('Policy Cleaner is now running on port '+ port + '∠( ᐛ 」∠)＿');

module.exports = app;
