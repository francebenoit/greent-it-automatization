'use strict';

const GreenITDataExcelGenerator = require('./GreenITDataExcelGenerator');
const GreenItDataBuilder = require('../../builders/GreenITDataWrapperBuilder');
const Interface = require('../../Interface');
const FileGeneratorInterface = require('./FileGeneratorInterface');


class FileGenerator {
	constructor(executor = null) {
		this.greenItDataBuilder = new GreenItDataBuilder();
		this.executor = executor || new GreenITDataExcelGenerator();
		Interface.checkImplements(this.executor, FileGeneratorInterface);
	}

	/**
	 *
	 * @param {string} csvPath
	 * @param {string} filePath
	 */
	async execute(csvPath, filePath) {
		const greenItData = await this.greenItDataBuilder.execute(csvPath);

		await this.executor.createFile(greenItData,filePath);
	}

	getFilePath() {
		return this.executor.getFilePath();
	}
}

module.exports = FileGenerator;
