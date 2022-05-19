'use strict';

class GreenITDataWrapper {
	_baseUrl;
	_greenDataAverage;
	_webPageInformationList = [];
	_annualFootprint;
	_gesTotalInG = 0;
	_waterConsumptionTotalInCl = 0;

	get baseUrl() {
		return this._baseUrl;
	}

	set baseUrl(value) {
		this._baseUrl = value;
	}

	get greenDataAverage() {
		return this._greenDataAverage;
	}

	/**
	 * @param {GreenITDataAverage} value
	 */
	set greenDataAverage(value) {
		this._greenDataAverage = value;
	}

	/**
	 * @returns {GreenITDataAverage}
	 */
	get webPageInformationList() {
		return this._webPageInformationList;
	}

	/**
	 * @param {WebPageInformation} webPageInformation 
	 */
	addWebPageInformation(webPageInformation) {
		this._webPageInformationList.push(webPageInformation);
	}

	/**
	 * @param {AnnualFootprint} annualFootprint
	 */
	set annualFootprint(annualFootprint) {
		this._annualFootprint = annualFootprint;
	}

	get annualFootprint() {
		return this._annualFootprint;
	}
	set gesTotalInG(value) {
		this._gesTotalInG = value;
	}

	get gesTotalInG() {
		return this._gesTotalInG;
	}

	set waterConsumptionTotalInCl(value) {
		this._waterConsumptionTotalInCl = value;
	}

	get waterConsumptionTotalInCl() {
		return this._waterConsumptionTotalInCl;
	}
}

module.exports = GreenITDataWrapper;
