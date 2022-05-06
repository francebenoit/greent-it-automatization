'use strict'

const AnnualFootprint = require("../models/AnnualFootprint");

const GRAM_IN_TON = 1000000;
const CL_IN_L = 100;
const OLYMPIC_POOL_CAPACITY_IN_M3 = 2500000;
const CAR_EMISSION_IN_G = 130;
const EARTH_CIRCLE_IN_KM = 42000;
const FRENCH_CITIZEN_GES_IN_T = 11;
const MONTHS_IN_YEAR = 12;

class AnnualFootprintBuilder {
  /**
   * @private
   * @type AnnualFootprint
   */
  _annualFootprint;

  /**
   * @private
   * @type number
   */
  _annualTraffic;

  constructor() {
    this._annualFootprint = new AnnualFootprint();
  }

  /**
   * @param {number} monthlyTraffic
   * @param {GreenITDataWrapper} greenITDataWrapper
   *
   * @returns AnnualFootprint
   */
  execute(monthlyTraffic, greenITDataWrapper) {
    this.buildAnnualTraffic(monthlyTraffic);
    this.buildGesEmission(greenITDataWrapper);
    this.buildWaterConsumption(greenITDataWrapper);
    this.roundData();

    return this._annualFootprint;
  }

  /**
   * @param {number} monthlyTraffic
   */
  buildAnnualTraffic(monthlyTraffic) {
    this._annualTraffic = monthlyTraffic * MONTHS_IN_YEAR;
    this._annualFootprint.traffic = this._annualTraffic;
  }

  /**
   * @param {GreenITDataWrapper} greenITDataWrapper
   */
  buildWaterConsumption(greenITDataWrapper) {
    this._annualFootprint.waterInCl = greenITDataWrapper.waterConsumptionTotalInCl * this._annualTraffic;
    this._annualFootprint.waterInL = this._annualFootprint.waterInCl / CL_IN_L;
    this._annualFootprint.olympicSwimmingPool = this._annualFootprint.waterInL / OLYMPIC_POOL_CAPACITY_IN_M3;
  }

  /**
   * @param {GreenITDataWrapper} greenITDataWrapper
   */
  buildGesEmission(greenITDataWrapper) {
    var annualGesInGCO2 = greenITDataWrapper.gesTotalInG * this._annualTraffic;

    this._annualFootprint.gesInGCO2 = annualGesInGCO2;
    this._annualFootprint.carKm = annualGesInGCO2 / CAR_EMISSION_IN_G;
    this._annualFootprint.carCircleGlobe = this._annualFootprint.carKm / EARTH_CIRCLE_IN_KM;
    this._annualFootprint.gesInTCO2 = annualGesInGCO2 / GRAM_IN_TON;
    this._annualFootprint.frenchCitizenGes = this._annualFootprint.gesInTCO2 / FRENCH_CITIZEN_GES_IN_T;
  }

  roundData() {
    for (var property in this._annualFootprint) {
      if (this._annualFootprint.hasOwnProperty(property) && !isNaN(this._annualFootprint[property])) {
        this._annualFootprint[property] = Math.round(this._annualFootprint[property] * 100) / 100;
      }
    }
  }
}

module.exports = AnnualFootprintBuilder;