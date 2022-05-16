'use strict';

const fs = require('fs');
const path = require('path');

const WebTrafficError = require('../exceptions/WebTrafficError');
const LogErrorFormatter = require('../formatters/LogErrorFormatter');
const FileGenerator = require('../services/fileGenerators/FileGenerator');

const ERROR_MESAGES = {
	'on_web_traffic_services' : 'error.on.webtraffic.service',
	'on_file_input' : 'error.on.upload.csv.file.max 1Mb',
	'unknown' : 'error.server'
};

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
			const fileGenerator = new FileGenerator();
			const filename = fileGenerator.getFilename();
			await fileGenerator.execute(csvPath, filename);

			res.download(path.resolve(filename), filename);
		} catch (error) {		
			const errorMessage = error instanceof WebTrafficError ? ERROR_MESAGES.on_web_traffic_services : ERROR_MESAGES.unknown;
			logger.error(LogErrorFormatter.execute(error));

			redirectToIndexWithError(errorMessage);
		}
	}
};
