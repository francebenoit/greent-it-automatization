'use strict';

const fs = require('fs');

const WebTrafficError = require('../exceptions/WebTrafficError');
const LogErrorFormatter = require('../formatters/LogErrorFormatter');
const FileGenerator = require('../services/fileGenerators/FileGenerator');
const GreenITDataExcelGenerator = require('../services/fileGenerators/GreenITDataExcelGenerator');
const GreenITDataImageGenerator = require('../services/fileGenerators/GreenITDataImageGenerator');

const ERROR_MESAGES = {
	'on_web_traffic_services' : 'error.on.webtraffic.service',
	'on_file_input' : 'error.on.upload.csv.file.max 1Mb',
	'unknown' : 'error.server'
};

const TEST_ENV = 'test';
const IMAGE_TYPE = 'image';

/**
 * @param {Request} req
 * @param {Response} res
 */
exports.execute = async function (req,res) {
	const csv = req.file;
	const csvPath = csv.path;

	fileIsValid() ? downloadFile(): redirectToIndexWithError();
	fs.unlinkSync(csvPath);

	/**
	 * @returns {boolean}
	 */
	function fileIsValid() {
		return csv.mimetype === 'text/csv' && csv.size < 1000;
	}

	/**
	 * @param {string} errorMessage
	 * @returns {void}
	 */
	function redirectToIndexWithError(errorMessage = ERROR_MESAGES.on_file_input) {
		res.render('index', {error: errorMessage});
	}

	/**
	 * @returns {void}
	 */
	async function downloadFile() {
		try {
			const fileGenerator = getFileGeneratorBySubmitType();
			const filePath = fileGenerator.getFilePath();
			await fileGenerator.execute(csvPath, filePath);

			res.download(filePath, filePath, function (err) {
				if (err) {
					logger.error(err);
				}
				if (process.env.APP_ENV !== TEST_ENV) {
					fs.unlinkSync(filePath);
				}
			});
		} catch (error) {		
			const errorMessage = error instanceof WebTrafficError ? ERROR_MESAGES.on_web_traffic_services : ERROR_MESAGES.unknown;
			logger.error(LogErrorFormatter.execute(error));

			redirectToIndexWithError(errorMessage);
		}

		/**
		 * @returns {FileGeneratorInterface}
		 */
		function getFileGeneratorBySubmitType() {
			const fileType = req.body.fileType;
			const generator = fileType === IMAGE_TYPE ? new GreenITDataImageGenerator() : new GreenITDataExcelGenerator();
			
			return new FileGenerator(generator);
		}
	}
};
