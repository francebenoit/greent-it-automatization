const DELAY_BEFORE_REMOVAL_IN_MS = 300000; //5 min
const DIRECTORIES_TO_CLEAN = [
	'uploads',
	'reports'
];
const NO_DELAY_OPTIONS = 'delay=false';
const { argv } = require ('node:process');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const winston = require('winston');

const doRemoveFileWithoutDelay = getCommandArgument();
const logger = createLogger();
const now = Date.now();

DIRECTORIES_TO_CLEAN.forEach(directory => {
	const directoryPath = path.resolve(directory);

	fs.readdir(directoryPath,function(err,files){
		handleError(err);	
		files.forEach(function(fileName){
			if (!fileName) {
				return;
			}			
			const filePath = path.resolve(directoryPath,fileName); 

			fs.stat(filePath, (err, stats) => {
				handleError(err);
				if (fileMustBeKept(stats)) {
					return;
				}				
				const rmCommand = spawn('rm', [filePath]);

				rmCommand.on('error', (error) => {
					logger.error(`error: ${error.message}`);
				});
			
				rmCommand.on('close', code => {
					const file = `${directory}/${fileName}`;
					if (code === 0) {
						logger.info(`${file} removed`);
					} else {
						logger.error(`${file} exit with code ${code}`);
					}
				});				      
			});			
		});
	});
});

/**
 * @returns {boolean}
 */
function getCommandArgument() {
	let doRemoveFileWithoutDelay = false;
	argv.forEach((value) => {
		if (value === NO_DELAY_OPTIONS) {
			doRemoveFileWithoutDelay = true;
			return;
		}
	});

	return doRemoveFileWithoutDelay;
}

/**
 * @returns {void}
 */
function createLogger() {
	return winston.createLogger({
		transports: [
			new winston.transports.File({
				filename: path.resolve('logs', 'clean_files.log')
			})
		]
	});
}

/**
 * @param {Error|null} err
 * @returns {void}
 */
function handleError(err) {
	if (err) {
		logger.error(err.message);
		
		throw err;
	}
}

/**
 * @param {Stats} stats
 * @returns {boolean}
 */
function fileMustBeKept(stats) {
	return !(doRemoveFileWithoutDelay || isDelayRespected(stats));
}

/**
 *
 * @param {Stats} stats
 * @returns {boolean}
 */
function isDelayRespected(stats) {
	return now - stats.mtimeMs > DELAY_BEFORE_REMOVAL_IN_MS;
}

