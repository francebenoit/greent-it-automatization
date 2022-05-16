'use strict';

const LOGS_FOLDER = 'logs/';

require('custom-env').env()
require('dotenv').config();

const express = require('express');
const sls = require('serverless-http');
const app = express();
const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');


//logger
app.use(expressWinston.logger({
	transports: [
		new winston.transports.Console()
	],
	format: winston.format.combine(
		winston.format.json()
	),
	meta: true,
	msg: "HTTP {{req.method}} {{req.url}}",
	expressFormat: true,
	colorize: false,
	ignoreRoute: function (req, res) { 
		return res.statusCode === 200 ? true : false;
	}
}));

const logger = winston.createLogger({
	transports: [
	  new winston.transports.Console(),
	  new winston.transports.File({ 
		  filename: path.resolve(LOGS_FOLDER,'combined.log'), 
		  'level' : ['debug','info','notice','warning'],
		  'timestamp' : true  
		}),
	  new winston.transports.File({
		   filename: path.resolve(LOGS_FOLDER,'error.log'), 
		   'level' : 'error',
		   'timestamp' : true  
		})
	]
});

const webTrafficLogger = winston.createLogger({
	transports: [
	  new winston.transports.File({ 
		  filename: path.resolve(LOGS_FOLDER,'web_traffic.log'), 
		  'timestamp' : true  
		})
	]
});

//global var
global.uploadPath = path.resolve(__dirname) + ('/uploads/');
global.logger = logger;
global.webTrafficLogger = webTrafficLogger;
global.LOGS_FOLDER = LOGS_FOLDER;

//routing
const routes = require('./app/routes/routes.js');
routes(app);

//handle post form
app.use(express.urlencoded({'extended' : true}));
app.use(express.json());

//view engine setup
app.use(express.static('public'))


app.set('views','./views');
app.set('view engine', 'pug');

// dev server
const port = process.env.PORT || 3030;
app.listen(port);
console.log('running on port ' + port);

module.exports.server = sls(app)

