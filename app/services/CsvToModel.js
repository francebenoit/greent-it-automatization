'use strict'

const fs = require('fs').promises;
const {parse} = require('csv-parse/sync');
const GreenItDataWrapper = require('../models/GreenITDataWrapper');
const WebPageInformationBuilder = require('../builders/WebPageInformationBuilder');

const HEADERS = [
    'Date',
    'Url',
    'Request number',
    'Size(kb)',
    'Dom size',
    'Greenhouse Gases Emission (gCO2e)',
    'Water consumption',
    'ecoIndex',
    'Grade'
];

class CsvToModel {
    /**
     *
     * @param {string} csvPath
     * @returns {GreenItDataWrapper}
     */
    async execute(csvPath) {
       
        const fileContent = await fs.readFile(csvPath);
        const records = parse(fileContent, {columns: false ,quote: '',delimiter:';',trim:true});

        checkHeaders();
        removeHeaders();

        return createModel();
        

        function checkHeaders() {
            if (JSON.stringify(HEADERS) !== JSON.stringify(records[0])) {
                throw Error('Please check csv headers');
            }
        }
          
        function removeHeaders() {
            records.shift();
        }

        function createModel() {
            var greenITDataWrapper = new GreenItDataWrapper();
            var webPageInformationBuilder = new WebPageInformationBuilder();

            records.forEach(row => {
                greenITDataWrapper.addWebPageInformation(
                    webPageInformationBuilder.execute(
                        row[1],
                        row[2],
                        row[3],
                        row[4],
                        row[5],
                        row[6],
                        row[7],
                        row[8]
                    ));
            });
           

            return greenITDataWrapper;
        }
    }
}

module.exports = CsvToModel;