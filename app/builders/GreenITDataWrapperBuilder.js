'use strict';

const CsvToModel = require ('../services/CsvToModel');
const SimilarWeb = require('../services/webTraffic/SimilarWeb');
const Interface = require('../Interface');
const WebTrafficInterface = require('../services/webTraffic/WebTrafficInterface');
const GreenITDataAverageBuilder = require('./GreenITDataAverageBuilder');
const AnnualFootprintBuilder = require('./AnnualFootprintBuilder');
 

class GreenITDataWrapperBuilder {
	/**
	 * @param {CsvToModel} csvToModel
	 * @param {WebTrafficInterface} webTraffic
	 * @param {GreenITDataAverageBuilder} greenDataAverageBuilder
	 * @param {AnnualFootprintBuilder} annualFootprintBuilder
	 */
	constructor(csvToModel = null, webTraffic = null, greenDataAverageBuilder = null, annualFootprintBuilder = null) {
		this.csvToModel = csvToModel ? csvToModel : new CsvToModel();
		this.webTraffic = webTraffic ? webTraffic : new SimilarWeb();
		Interface.checkImplements(this.webTraffic, WebTrafficInterface);

		this.greenDataAverageBuilder = greenDataAverageBuilder ? greenDataAverageBuilder : new GreenITDataAverageBuilder();
		this.annualFootprintBuilder = annualFootprintBuilder ? annualFootprintBuilder : new AnnualFootprintBuilder() ;
	}

	/**
	 * @param {string} csvPath
	 * @returns {GreenITDataWrapper}
	 */
	async execute(csvPath) {
		/** @type {GreenITDataWrapper} */
		var greenITDataWrapper = await this.csvToModel.execute(csvPath);
		setBaseUrl(greenITDataWrapper);
		setTotals(greenITDataWrapper);
		greenITDataWrapper.greenDataAverage = this.greenDataAverageBuilder.execute(greenITDataWrapper);

		const monthlyWebTraffic = await this.webTraffic.getTotalVisitPerMonth(greenITDataWrapper.baseUrl);
		greenITDataWrapper.annualFootprint = this.annualFootprintBuilder.execute(monthlyWebTraffic,greenITDataWrapper);

		return greenITDataWrapper;

		/**
		 * @param {GreenITDataWrapper} greenITDataWrapper
		 */
		function setBaseUrl(greenITDataWrapper) {
			const firstUrl = greenITDataWrapper.webPageInformationList[0].url;

			greenITDataWrapper.baseUrl = (new URL(firstUrl)).origin;
		}

		/**
		 * @param {GreenITDataWrapper} greenITDataWrapper
		 */
		function setTotals(greenITDataWrapper) {
			resetTotals(greenITDataWrapper);
			var webPageInformationList = greenITDataWrapper.webPageInformationList;

			addTotalsToGreenItDataWrapper(greenITDataWrapper,webPageInformationList);

			/**
			 *
			 */
			function resetTotals() {
				greenITDataWrapper.waterConsumptionTotalInCl = 0;
				greenITDataWrapper.gesTotalInG = 0;
			}

			/**
			 * @param {GreenItDataWrapper} greenItDataWrapper
			 * @param {Array} webPageInformationList
			 */
			function addTotalsToGreenItDataWrapper(greenItDataWrapper,webPageInformationList) {

				for (var i=0; i< webPageInformationList.length;i++) {
					greenITDataWrapper.waterConsumptionTotalInCl += webPageInformationList[i].waterConsumptionInCL;
					greenITDataWrapper.gesTotalInG += webPageInformationList[i].gesInGCO2;
				}
			}
		}
	}
}

module.exports = GreenITDataWrapperBuilder;