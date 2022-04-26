'use strict';

const express = require('express');
const sls = require('serverless-http');
const app = express();
const path = require('path');
const fs = require('fs');
/* const axios = require('axios');
const FormData = require('form-data'); */
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const { check, validationResult } = require("express-validator");

//handle post form
app.use(express.urlencoded({'extended' : true}));
app.use(express.json());

//global var
global.appRoot = path.resolve(__dirname);

app.get('/', async (req, res, next) => {
  res.render('index');
});

app.post('/',upload.single('csv'), async function (req, res, next) {
  const csv = req.file;
  //console.log(csv)
  if(csv.mimetype !== 'text/csv' || csv.size > 1000 ){
    fs.unlinkSync(csv.path)
    res.render('index', {error: 'Please upload a csv file. Max 1Mb'});
  } else {
    res.render('index', {info: 'ok'});
  }  
});

//view engine setup
app.use(express.static('public'))

app.set('views','./views');
app.set('view engine', 'pug');

// dev server
app.listen(3030);

module.exports.server = sls(app)

