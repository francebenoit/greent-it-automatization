'use strict';
const assert = require('assert');

const WebPageInformationBuilder = require('../../../app/builders/WebPageInformationBuilder');

describe('WebPageInformationBuilder', () => {
	it('build web page information with correct type and sanitized url when input is string', () => {
		const webPageInformationBuilder = new WebPageInformationBuilder();
		const webPageInformation = webPageInformationBuilder.execute(
			'"https://github.com/adaltas/node-csv-parse/issues/138"',
			'65',
			'619',
			'1533',
			'2.32',
			'3.18',
			'34.05',
			'E'
		);

		assert.equal(webPageInformation.url,'https://github.com/adaltas/node-csv-parse/issues/138');
		assert.equal(webPageInformation.requestNumber,65);
		assert.equal(webPageInformation.sizeKb,619);
		assert.equal(webPageInformation.domSize,1533);
		assert.equal(webPageInformation.gesInGCO2,2.32);
		assert.equal(webPageInformation.waterConsumptionInCL,3.18);
		assert.equal(webPageInformation.ecoIndex,34.05);
		assert.equal(webPageInformation.rank,'E');
	});

});