var express = require('express');
var http = require('http');
var path = require('path');
var SessionStore = require("session-mongoose")(express);
var store = new SessionStore({
url: "mongodb://localhost/session",
interval: 120000
});
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');



/*var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'roo t',
    password: 'liuboen',
    database: 'nodejs',
    port: 3306
});
conn.connect();
*/

var routes = require('./routes');
var users = require('./routes/user');
var movie = require('./routes/movie');

var app = express();

//  engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
    //app.use(express.cookieSession({secret : 'fens.me'}));
    app.use(express.session({
    secret : 'fens.me',
    key: 'cookiemyname',//cookie name
    store: store,
    cookie: { maxAge: 900000 }
    }));
    app.use(function(req, res, next){
        res.locals.user = req.session.user;
        var err = req.session.error;
        delete req.session.error;
        res.locals.message = '';
        if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
        next();
    });

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/users', users.list);
app.get('/login.html', routes.login);
app.post('/login.html', routes.doLogin);
app.get('/logout', authentication);
app.get('/logout', routes.logout);
app.get('/home', authentication);
app.get('/home', routes.home);
app.get('/test/:name', routes.test);


app.get('/movie/add',movie.movieAdd);//增加
app.get('/movie/list',movie.movieAdd);//查看列表
app.post('/movie/add',movie.doMovieAdd);//提交
app.get('/movie/:name',movie.movieAdd);//编辑查询
app.get('/movie/json/:name',movie.movieJSON);//JSON数据
app.get('/movie/json/list/:name',movie.movieJSONList);//JSON数据


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function authentication(req, res, next) {
if (!req.session.user) {
req.session.error='请先登陆';
return res.redirect('/login.html');
}
next();
}
function notAuthentication(req, res, next) {
if (req.session.user) {
req.session.error='已登陆';
return res.redirect('/');
}
next();
}
//console.log(app.routes)
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

module.exports = app;
