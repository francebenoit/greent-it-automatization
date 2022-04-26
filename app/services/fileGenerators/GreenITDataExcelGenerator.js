const HEADERS = [
    'Url',
    'Nombre requêtes',
    'Taille(kb)',
    'Taille du dom',
    'GES',
    'Eau',
    'ecoIndex',
    'Note'
];

const ROW_LABELS = {
    'average' : 'Moyenne',
    'navigationFootprint' :'Empreinte du Parcours (gCO2e / cl eau)',
    'traffic' : 'Traffic / an',
    'annualTrafficLowUnit' : 'Empreinte Traffic annuel (gCO2e / cl eau)',
    'annualTrafficHighUnit' : 'Empreinte Traffic annuel (tCO2e / L eau)',
    'carKm' : 'Equivalence km voiture (130g/km)',
    'carCircleGlobe' : 'Tour de terre en voiture',
    'frenchCitizenGes' : 'Nb de Français (11tCO2e)',
    'olympicSwimmingPool' : 'Nb de piscine olympique (2750m3)'
};

const FILE_NAME = 'footPrintReport.xls';

const fs = require('fs');

const DELIMITER = '\t';
const ROW_BREAK = '\n';

class GreenITDataExcelGenerator {

    /**
     *
     * @returns {string}
     */
    getFilename() {
        return FILE_NAME;
    }
    /**
     * @param {GreenITDataWrapper} greenItData
     * @param {string} filename
     */
    async createFile(greenItData, filename) {
        removeOldFile();

        var excelData='';
        excelData+=generateRowHeaders();
        excelData+=generateWebPageInformationRows()
        excelData+=addRowBreak();
        excelData+=generateAverageRow(greenItData.greenDataAverage);
        excelData+=generateNavigationFootprint(greenItData);

        var annualFootprint = greenItData.annualFootprint;
        excelData+=generateTrafficRow(annualFootprint.traffic);
        excelData+=generateAnnualTrafficLowUnit(annualFootprint);
        excelData+=generateAnnualTrafficHighUnit(annualFootprint);
        excelData+=generateCarKm(annualFootprint);
        excelData+=generateCarCircleGlobe(annualFootprint);
        excelData+=generateFrenchCitizenGes(annualFootprint);
        excelData+=generateOlympicSwimmingPool(annualFootprint);


        fs.appendFileSync(filename, excelData, (err) => {
            if (err) {
                throw err;
            }
        });

        function removeOldFile() {
            var actualFilePath = __dirname + '/../../../' + FILE_NAME;

            if (fs.existsSync(actualFilePath)) {
                fs.unlinkSync(actualFilePath);
            }
        }

        /**
         * @returns string
         */
        function generateRowHeaders() {
            var row = '';
            for (var j = 0; j < HEADERS.length; j++) {
                row+=HEADERS[j] + DELIMITER;
            }
            return row + ROW_BREAK;
        }

        /**
         * @returns string
         */
        function generateWebPageInformationRows() {
            var webPageInformationList = greenItData.webPageInformationList;
            var excelData = '';

            for (var i = 0; i < webPageInformationList.length; i++) {
                excelData += generateWebPageInformationRow(webPageInformationList[i]);
            }
            return excelData;
        }

        /**
         * @param {WebPageInformation} webPageInformation
         *
         * @returns string
         */
        function generateWebPageInformationRow(webPageInformation) {
            return webPageInformation.url + DELIMITER
                + webPageInformation.requestNumber + DELIMITER
                + webPageInformation.sizeKb +DELIMITER
                + webPageInformation.domSize + DELIMITER
                + webPageInformation.gesInGCO2 + DELIMITER
                + webPageInformation.waterConsumptionInCL + DELIMITER
                + webPageInformation.ecoIndex + DELIMITER
                + webPageInformation.rank
                + ROW_BREAK
            ;
        }

        function addRowBreak() {
            return ROW_BREAK;
        }

        /**
         * @param {GreenITDataAverage} greenItDataAverage
         * @returns string
         */
        function generateAverageRow(greenItDataAverage) {
            return ROW_LABELS.average + DELIMITER
                + greenItDataAverage.requestNumber + DELIMITER
                + greenItDataAverage.sizeKb + DELIMITER
                + greenItDataAverage.domSize + DELIMITER
                + DELIMITER
                + DELIMITER
                + greenItDataAverage.ecoIndex + DELIMITER
                + greenItDataAverage.rank
                + ROW_BREAK;
        }

        /**
         *
         * @param {GreenITDataWrapper} greenItData
         * @returns {string}
         */
        function generateNavigationFootprint(greenItData) {
            return ROW_LABELS.navigationFootprint + DELIMITER
                + DELIMITER
                + DELIMITER
                + DELIMITER
                + greenItData.gesTotalInG + DELIMITER
                + greenItData.waterConsumptionTotalInCl
                + ROW_BREAK;
        }

        function generateTrafficRow(annualTraffic) {
            return ROW_LABELS.traffic + DELIMITER
                + annualTraffic
                + ROW_BREAK ;
        }

        /**
         *
         * @param {AnnualFootprint} annualFootprint
         * @returns {string}
         */
        function generateAnnualTrafficLowUnit(annualFootprint) {
            return ROW_LABELS.annualTrafficLowUnit + DELIMITER
                + DELIMITER
                + DELIMITER
                + DELIMITER
                + annualFootprint.gesInGCO2 + DELIMITER
                + annualFootprint.waterInCl + DELIMITER
                + ROW_BREAK;
        }

        /**
         *
         * @param {AnnualFootprint} annualFootprint
         * @returns {string}
         */
        function generateAnnualTrafficHighUnit(annualFootprint) {
            return ROW_LABELS.annualTrafficHighUnit + DELIMITER
                + DELIMITER
                + DELIMITER
                + DELIMITER
                + annualFootprint.gesInTCO2 + DELIMITER
                + annualFootprint.waterInL + DELIMITER
                + ROW_BREAK;
        }
        /**
         *
         * @param {AnnualFootprint} annualFootprint
         * @returns {string}
         */
        function generateCarKm(annualFootprint) {
            return ROW_LABELS.carKm + DELIMITER
                + DELIMITER
                + DELIMITER
                + DELIMITER
                + annualFootprint._carKm + DELIMITER
                + ROW_BREAK;
        }

        /**
         *
         * @param {AnnualFootprint} annualFootprint
         * @returns {string}
         */
        function generateCarCircleGlobe(annualFootprint) {
            return ROW_LABELS.carCircleGlobe + DELIMITER
                + DELIMITER
                + DELIMITER
                + DELIMITER
                + annualFootprint._carCircleGlobe + DELIMITER
                + ROW_BREAK;
        }

        /**
         *
         * @param {AnnualFootprint} annualFootprint
         * @returns {string}
         */
        function generateFrenchCitizenGes(annualFootprint) {
            return ROW_LABELS.frenchCitizenGes + DELIMITER
                + DELIMITER
                + DELIMITER
                + DELIMITER
                + annualFootprint._frenchCitizenGes + DELIMITER
                + ROW_BREAK;
        }

        /**
         *
         * @param {AnnualFootprint} annualFootprint
         * @returns {string}
         */
        function generateOlympicSwimmingPool(annualFootprint) {
            return ROW_LABELS.olympicSwimmingPool + DELIMITER
                + DELIMITER
                + DELIMITER
                + DELIMITER
                + DELIMITER
                + annualFootprint._olympicSwimmingPool + DELIMITER
                + ROW_BREAK;
        }
    }
}

module.exports = GreenITDataExcelGenerator;