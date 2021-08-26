import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import errorhandler from 'errorhandler';
import expressValidator from 'express-validator';
import helmet from 'helmet';
import config from './config/config'
import router from './modules/shared/routes';

const isProduction = config.isProduction === 'production';
// Create global app Objects
const app = express();
// Set app to use cors
app.use(cors());

// Normal express config defaults
app.use(logger('dev'));
app.use(helmet());
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(errorhandler());
}

app.use("/api",router);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// error handlers

// development error handler
// will print stacktrace

if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(err.stack);

    res.status(err.status || 500);

    return res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

export default app;
