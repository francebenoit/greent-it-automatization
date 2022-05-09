'use strict';

class AnnualFootprint {
	_traffic;
	_gesInGCO2;
	_waterInCl;
	_gesInTCO2;
	_waterInL;
	_carKm;
	_carCircleGlobe;
	_frenchCitizenGes;
	_olympicSwimmingPool;

	get traffic() {
		return this._traffic;
	}

	set traffic(value) {
		this._traffic = value;
	}

	get gesInGCO2() {
		return this._gesInGCO2;
	}

	set gesInGCO2(value) {
		this._gesInGCO2 = value;
	}

	get waterInCl() {
		return this._waterInCl;
	}

	set waterInCl(value) {
		this._waterInCl = value;
	}

	get gesInTCO2() {
		return this._gesInTCO2;
	}

	set gesInTCO2(value) {
		this._gesInTCO2 = value;
	}

	get waterInL() {
		return this._waterInL;
	}

	set waterInL(value) {
		this._waterInL = value;
	}

	get carKm() {
		return this._carKm;
	}

	set carKm(value) {
		this._carKm = value;
	}

	get carCircleGlobe() {
		return this._carCircleGlobe;
	}

	set carCircleGlobe(value) {
		this._carCircleGlobe = value;
	}

	get frenchCitizenGes() {
		return this._frenchCitizenGes;
	}

	set frenchCitizenGes(value) {
		this._frenchCitizenGes = value;
	}

	get olympicSwimmingPool() {
		return this._olympicSwimmingPool;
	}

	set olympicSwimmingPool(value) {
		this._olympicSwimmingPool = value;
	}


}

module.exports = AnnualFootprint;