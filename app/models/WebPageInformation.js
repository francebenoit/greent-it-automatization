'use strict';

class WebPageInformation {

	/** @type {string} **/
	_url;
	/**@type {number} **/
	_requestNumber;
	/**@type {number} **/
	_sizeKb;
	/**@type {number}**/
	_domSize;
	/**@type {number} **/
	_gesInGCO2;
	/**@type {number} **/
	_waterConsumptionInCL;
	/**@type {number} **/
	_ecoIndex;
	/**@type {number} **/
	_rank;

	get url() {
		return this._url;
	}

	set url(value) {
		this._url = value;
	}

	get requestNumber() {
		return this._requestNumber;
	}

	set requestNumber(value) {
		this._requestNumber = value;
	}

	get sizeKb() {
		return this._sizeKb;
	}

	set sizeKb(value) {
		this._sizeKb = value;
	}

	get domSize() {
		return this._domSize;
	}

	set domSize(value) {
		this._domSize = value;
	}

	get ecoIndex() {
		return this._ecoIndex;
	}

	set ecoIndex(value) {
		this._ecoIndex = value;
	}

	get rank() {
		return this._rank;
	}

	set rank(value) {
		this._rank = value;
	}

	get gesInGCO2() {
		return this._gesInGCO2;
	}

	set gesInGCO2(value) {
		this._gesInGCO2 = value;
	}

	get waterConsumptionInCL() {
		return this._waterConsumptionInCL;
	}

	set waterConsumptionInCL(value) {
		this._waterConsumptionInCL = value;
	}
}

module.exports = WebPageInformation;