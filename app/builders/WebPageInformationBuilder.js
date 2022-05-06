'use strict'

const WebPageInformation = require("../models/WebPageInformation");

class WebPageInformationBuilder {
  /**
   * @param {string} url
   * @param {string} requestNumber
   * @param {string} sizeKb
   * @param {string} domSize
   * @param {string} ges
   * @param {string} waterConsumptionCL
   * @param {string} ecoIndex
   * @param {string} rank
   */
  execute(url, requestNumber, sizeKb, domSize, ges, waterConsumptionCL, ecoIndex, rank) {
    var webPageInformation = new WebPageInformation();

    webPageInformation.url = url.replace(/["]+/g, '');
    webPageInformation.requestNumber = parseInt(requestNumber);
    webPageInformation.sizeKb = parseInt(sizeKb);
    webPageInformation.domSize = parseInt(domSize);
    webPageInformation.gesInGCO2 = parseFloat(ges);
    webPageInformation.waterConsumptionInCL = parseFloat(waterConsumptionCL);
    webPageInformation.ecoIndex = parseFloat(ecoIndex);
    webPageInformation.rank = rank

    return webPageInformation;
  }
}

module.exports = WebPageInformationBuilder;
