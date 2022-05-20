'use strict';

const uniqid = require('uniqid');
const path = require('path');

const GreenItDataBuilder = require('../../builders/GreenITDataWrapperBuilder');
const Interface = require('../../Interface');
const FileGeneratorInterface = require('./FileGeneratorInterface');


class FileGenerator {
	constructor(generator) {
		this.greenItDataBuilder = new GreenItDataBuilder();
		Interface.checkImplements(generator, FileGeneratorInterface);

		this.generator = generator;
	}

	/**
	 *
	 * @param {string} csvPath
	 * @param {string} filePath
	 */
	async execute(csvPath, filePath) {
		const greenItData = await this.greenItDataBuilder.execute(csvPath);

		await this.generator.createFile(greenItData,filePath);
	}

	getFilePath() {
		return path.resolve(process.env.REPORT_DIR , uniqid() + this.generator.getFileName());
	}
}

module.exports = FileGenerator;
