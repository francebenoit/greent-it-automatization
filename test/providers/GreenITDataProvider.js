'use strict'

const WebPageInformationProvider = require("./WebPageInformationProvider");
const GreenITDataWrapper = require("../../app/models/GreenITDataWrapper");
const GreenITDataAverage = require("../../app/models/GreenITDataAverage");
const AnnualFootprint = require("../../app/models/AnnualFootprint");

class GreenITDataProvider {
  static getTestDataWithWebPageInformationList() {
    const webPageInformationList = WebPageInformationProvider.getTestListData();
    const greenITData = new GreenITDataWrapper();

    webPageInformationList.forEach(webPageInformation => {
      greenITData.addWebPageInformation(webPageInformation)
    })

    return greenITData;
  }

  /**
   *
   * @return {GreenITDataWrapper}
   */
  static getTestDataWithAllInformation() {

    var greenItDataWrapper = this.getTestDataWithWebPageInformationList();
    greenItDataWrapper.greenDataAverage = this.buildGreenDataAverage();
    greenItDataWrapper.annualFootprint = this.buildAnnualFootprint();

    greenItDataWrapper.gesTotalInG = 6;
    greenItDataWrapper.waterConsumptionTotalInCl = 11;

    return greenItDataWrapper;
  }

  static buildGreenDataAverage() {
    var greenDataAverage = new GreenITDataAverage();
    greenDataAverage.requestNumber = 125;
    greenDataAverage.sizeKb = 6199;
    greenDataAverage.domSize = 1675;
    greenDataAverage.ecoIndex = 13.33;
    greenDataAverage.rank = 'F';

    return greenDataAverage;
  }

  static buildAnnualFootprint() {
    var annualFootprint = new AnnualFootprint();

    annualFootprint.traffic = 1980000;
    annualFootprint.gesInGCO2 = 11880000;
    annualFootprint.waterInCl = 21780000;
    annualFootprint.gesInTCO2 = 11.88;
    annualFootprint.waterInL = 217800;
    annualFootprint.carKm = 91384.62;
    annualFootprint.carCircleGlobe = 2.18;
    annualFootprint.frenchCitizenGes = 1.08;
    annualFootprint.olympicSwimmingPool = 0.09;

    return annualFootprint;
  }
}

module.exports = GreenITDataProvider;