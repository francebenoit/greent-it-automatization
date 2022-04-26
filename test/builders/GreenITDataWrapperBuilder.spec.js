'use strict';


const assert = require('assert');

const GreenITDataWrapper = require('../../app/models/GreenITDataWrapper');
const AnnualFootprintBuilder = require("../../app/builders/AnnualFootprintBuilder");
const CsvToModel = require("../../app/services/CsvToModel");
const sinon = require("sinon");
const GreenItDataProvider = require("../providers/GreenITDataProvider");
const GreenITDataWrapperBuilder = require("../../app/builders/GreenITDataWrapperBuilder");
const SimilarWeb = require("../../app/services/webTraffic/SimilarWeb");

describe('GreenITDataAverageBuilder', () => {
  let csvToModelStub, webTrafficStub;
  let greenITDataWrapper = GreenItDataProvider.getTestDataWithWebPageInformationList();
  let webTraffic = 464000000;


  beforeEach(function() {
      csvToModelStub = sinon.stub(CsvToModel.prototype,'execute').returns(greenITDataWrapper);
      webTrafficStub = sinon.stub(SimilarWeb.prototype,'getTotalVisitPerMonth').returns(webTraffic);

  });

  afterEach(function () {
    csvToModelStub.restore();
  })

  it('generate full GreenIT data from a converted csv mock', async () => {

    const greenITDataWrapperBuilder = new GreenITDataWrapperBuilder();
    var greenITDataWrapper = await greenITDataWrapperBuilder.execute('csvPath');

    assert.equal(greenITDataWrapper.baseUrl,'https://www.apple.com')
    assertOnGreenItDataTotal(greenITDataWrapper);
    assertGreenITDataAverage(greenITDataWrapper);
    assertAnnualFootprint(greenITDataWrapper);
  });

  /**
   * @param {GreenITDataWrapper} greenITDataWrapper
   */
  function assertAnnualFootprint(greenITDataWrapper) {
    var annualFootprint = greenITDataWrapper.annualFootprint;

    assert.equal(annualFootprint.gesInTCO2, 45434.88);
    assert.equal(annualFootprint.gesInGCO2, 45434880000);
    assert.equal(annualFootprint.waterInCl, 68208000000);
    assert.equal(annualFootprint.waterInL, 682080000);
    assert.equal(annualFootprint.olympicSwimmingPool, 272.83);
    assert.equal(annualFootprint.carKm, 349499076.92);
    assert.equal(annualFootprint.carCircleGlobe, 8321.41);
    assert.equal(annualFootprint.frenchCitizenGes, 4130.44);
  }

  /**
   * @param {GreenITDataWrapper} greenITDataWrapper
   */
  function assertGreenITDataAverage(greenITDataWrapper) {
    var greenITDataAverage = greenITDataWrapper.greenDataAverage;

    assert.equal(greenITDataAverage.requestNumber,125);
    assert.equal(greenITDataAverage.sizeKb,6199);
    assert.equal(greenITDataAverage.domSize,1675);
    assert.equal(greenITDataAverage.ecoIndex,13.9);
    assert.equal(greenITDataAverage.rank,'F')
  }

  /**
   * @param {GreenITDataWrapper} greenITDataWrapper
   */
  function assertOnGreenItDataTotal(greenITDataWrapper) {
    assert.equal(greenITDataWrapper.gesTotalInG,8.16);
    assert.equal(greenITDataWrapper.waterConsumptionTotalInCl, 12.25);
  }
})