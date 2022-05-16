'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const GreenITDataExcelGenerator = require('../../../../app/services/fileGenerators/GreenITDataExcelGenerator');
const GreenITDataProvider = require('../../providers/GreenITDataProvider');

describe('GreenITDataExcelGenerator', () => {
	it('creates the correct csv from GreenItDataWrapper Information', () => {
		const testDir = path.resolve('test','tmp');

		if (!fs.existsSync(testDir)){
			fs.mkdirSync(testDir);
		}
		const greenItDataWrapper = GreenITDataProvider.getTestDataWithAllInformation();
		const generator = new GreenITDataExcelGenerator();

		const actualFilePath = path.resolve(testDir,'testExcelFileGenerator.xls');

		if (fs.existsSync(actualFilePath)) {
			fs.unlinkSync(actualFilePath);
		} 

		generator.createFile(greenItDataWrapper, actualFilePath);
		const actualFile = fs.readFileSync(actualFilePath);

		const expectedFilePath = path.resolve('./test/files/fileAssertion.xls');
		const expectedFile = fs.readFileSync(expectedFilePath);

		assert.equal(actualFile.toString(),expectedFile.toString());
		fs.unlinkSync(actualFilePath);		
	});

});
