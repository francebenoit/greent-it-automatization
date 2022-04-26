'use strict';

require('dotenv').config();
const express = require('express');
const sls = require('serverless-http');
const app = express();
const path = require('path');

//global var
global.uploadPath = path.resolve(__dirname) + ('/uploads/');

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
app.listen(3030);

module.exports.server = sls(app)

