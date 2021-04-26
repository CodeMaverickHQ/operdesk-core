var express = require('express'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv').config(),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  Asset = require('./models/asset'),
  Employee = require('./models/employee'),
  app = express();

var companyName = "OperDesk.";
app.locals.companyName = "OperDesk.";
app.locals.currentUser = "Test";


var indexRoutes = require('./routes/index'),
    assetRoutes = require('./routes/assets'),
    employeeRoutes = require('./routes/employees');

const mongo_user = process.env.MONGO_USER
const mongo_pass = process.env.MONGO_PASS
    
const mongoUri = 'mongodb://'+ mongo_user +':'+ mongo_pass +'@srv-captain--mongo/assetcore?authSource=admin';
    mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(flash());

app.use(
  require('express-session')({
    secret: 'ladas are really amazing',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(function (req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');

  next();
});

app.use(indexRoutes);
app.use('/assets', assetRoutes);
app.use('/employees', employeeRoutes);

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;