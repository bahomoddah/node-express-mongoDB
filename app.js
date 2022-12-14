var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var hbs = require('express-handlebars');
var handlebars = require('handlebars');
var expressValidator = require('express-validator')
var expressSession = require('express-session')
var createError = require('http-errors');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var articlesRouter = require('./routes/articles');
var postsRouter = require('./routes/posts');
var customersRouter = require('./routes/customers');

var app = express();

// view engine setup
app.engine('hbs', hbs.engine({
  extname: 'hbs',
defaultLayout: 'layout',
handlebars: allowInsecurePrototypeAccess(handlebars),
 layoutsDir: __dirname + '/views/layouts/'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'maso', saveUninitialized: false, resave: false}))

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/articles', articlesRouter)
app.use('/posts', postsRouter)
app.use('/customers', customersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
