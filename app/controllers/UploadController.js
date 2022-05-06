'use strict';

const fs = require('fs');
const path = require('path');

const FileGenerator = require("../services/fileGenerators/FileGenerator");

/**
 * @param {Request} req
 * @param {Response} res
 */
 exports.execute = async function (req,res) {
   const csv = req.file;
   const csvPath = csv.path;

   if(fileIsValid() ){
     await downloadFile();
   } else {
     redirectToIndexWithError();
   }
    fs.unlinkSync(csvPath);

    function fileIsValid() {
        return csv.mimetype === 'text/csv' && csv.size < 1000;
    }

   function redirectToIndexWithError() {
     res.render('index', {error: 'Please upload a csv file. Max 1Mb'});
   }

   async function downloadFile() {
     const fileGenerator = new FileGenerator();
     const filename = fileGenerator.getFilename();
     await fileGenerator.execute(csvPath, filename);

     res.download(path.resolve(filename), filename);
   }
}