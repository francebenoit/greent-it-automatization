const DELAY_BEFORE_REMOVAL_IN_MS = 300000; //5 min

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const winston = require('winston');


const dir = path.resolve('uploads');
const logger = winston.createLogger({
	transports: [
		new winston.transports.File({ 
			filename: path.resolve('logs','clean_files.log')
		})
	]
});

fs.readdir(dir,function(err,files){
	if (err) {
		throw err;
	} 
	const now = Date.now();

	files.forEach(function(fileName){
		if(fileName) {
			const filePath = path.resolve(dir,fileName); 
        
			fs.stat(filePath, (err, stats) => {
				if(err) {
					throw err;
				}

				const isDelayRespected = now - stats.mtimeMs > DELAY_BEFORE_REMOVAL_IN_MS;

				if (isDelayRespected) {
					const rm = spawn('rm', [filePath]);

					rm.on('error', (error) => {
						logger.error(`error: ${error.message}`);
					});
                
					rm.on('close', code => {
						if (code === 0) {
							logger.info(`${fileName} removed`);
						} else {
							logger.error(`${fileName} exit with code ${code}`);
						}
					});
				}        
			});
		}
	});
});
