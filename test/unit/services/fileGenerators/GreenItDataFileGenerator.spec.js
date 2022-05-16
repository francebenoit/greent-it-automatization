'use strict';

const assert = require('assert');
const fs = require('fs');

const GreenITDataExcelGenerator = require('../../../../app/services/fileGenerators/GreenITDataExcelGenerator');
const GreenITDataProvider = require('../../providers/GreenITDataProvider');

describe('GreenITDataExcelGenerator', () => {
	it('creates the correct csv from GreenItDataWrapper Information', () => {
		const greenItDataWrapper = GreenITDataProvider.getTestDataWithAllInformation();
		const generator = new GreenITDataExcelGenerator();
		const filename = 'fileAssertion.xls';

		const actualFilePath = __dirname+'/../../../../' + filename;

		if (fs.existsSync(actualFilePath)) {
			fs.unlinkSync(actualFilePath);
		}

		generator.createFile(greenItDataWrapper, filename);

		const actualFile = fs.readFileSync(actualFilePath);

		const expectedFilePath = __dirname+'/../../../files/fileAssertion.xls';
		const expectedFile = fs.readFileSync(expectedFilePath);

		assert.equal(actualFile.toString(),expectedFile.toString());
		fs.unlinkSync(actualFilePath);
	});

});
