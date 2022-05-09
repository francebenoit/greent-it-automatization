'use strict';

class GreenITDataAverage {

	_requestNumber;
	_sizeKb;
	_domSize;
	_ecoIndex;
	_rank;

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
}

module.exports = GreenITDataAverage;