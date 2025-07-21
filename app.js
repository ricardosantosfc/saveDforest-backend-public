require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const cors = require('cors') 
const rateLimit = require('express-rate-limit');

const app = express();

//global rate limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes) -> might be finetuned in the future as its not realistic atm  
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(cors({
  credentials: true,
  origin: [
    process.env.FRONT_END_URL,
    process.env.FRONT_END_TESTING_URL
  ]
}));

//app.use(cors({credentials: true, origin: 'http://localhost:4200'})); 
app.set('trust proxy', 1) 

app.use(logger('dev'));
app.use(express.json({limit: '2kb'})); //highest value expected for iri endpoint, 788 b
app.use(express.static(path.join(__dirname, 'public')));

app.use(limiter); 

//for deployment
app.use(session({secret: process.env.SESSION_SECRET, name: 'saveDforest-Login-Session-Cookie', resave: false, saveUninitialized: false, 
proxy: true, cookie: {secure: true, sameSite: 'strict'}, store: MongoStore.create(
{ mongoUrl: process.env.MONGO_URL, stringify:false })}));


//for localhost
//app.use(session({secret: process.env.SESSION_SECRET, name: 'saveDforest-Login-Session-Cookie', resave: false, saveUninitialized: false, proxy: true, 
//store: MongoStore.create({ mongoUrl: process.env.MONGO_URL, stringify:false })}));

app.use('/', indexRouter);

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
  res.send('Nothing to see here!');
});

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
module.exports = app;
