
/**
 * Module dependencies.
 */
// this is what we need fixed
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'jade'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.use(express['static'](__dirname + '/views'));
app.get('/users', user.list);


// Start server
//http.listen(config.port, function () {
  //  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
//});


var server = http.createServer(app);
var ubidots = require('ubidots');

var client = ubidots.createClient('3d7d0739d5bf10d98ec1493886a019573465f7b1');
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


var io = require('socket.io').listen(server);
//server.listen(3000);
io.on('connect', function (socket) {
    
    
    
    
    
    console.log("Connection Made")
    
    
    socket.on('drinkIt', function (msg) {
        
        client.auth(function () {
            
            
            
            this.getDatasources(function (err, data) {
        //console.log(data.results);
            });
            
            
            var ds = this.getDatasource('55fdd10b762542386d53731a');
            
            ds.getVariables(function (err, data) {
        //console.log(data.results);
            });
            
            ds.getDetails(function (err, details) {
        //console.log(details);
            });
            
            var v = this.getVariable('55fdd16376254239c8738f16');
            
            v.getDetails(function (err, details) {
        //console.log(details);
            });
            
            
            
            v.getValues(function (err, data) {
        //console.log(data.results);
            });
            
            
            console.log("The message recieved is " + msg);
            
            v.saveValue(msg);
            console.log("We posted it to ubidots");
        });
     
    })
    
    
    
    
});
io.on('event', function (data) { });
io.on('disconnect', function () { });
