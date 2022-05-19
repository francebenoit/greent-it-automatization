'use strict';

require('custom-env').env();

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const path = require('path');
const fs = require('fs');
const assert = require('assert');

const requestUrl = process.env.HOST + ':' + process.env.PORT;

describe('UploadController', () => {
	it('should access the homepage', done => {
		chai
			.request(requestUrl)
			.get('/')
			.end((err, res) => {
				assert.equal(res.status,200);

				done();
			});
	});

	it('should upload a file', done => {
		createDirectories();

		chai
			.request(requestUrl)
			.post('/')
			.attach('csv', path.resolve('./test/files/ecoindex.csv'), 'ecoIndex.csv')
			.end((err, res) => {
				assert.equal(res.status,200);

				const dir = path.resolve(process.env.REPORT_DIR);			
				const files = fs.readdirSync(dir);
				assert.equal(files.length,1);

				const actualFile = fs.readFileSync(path.resolve(dir,files[0]));
				const expectedFile = fs.readFileSync( path.resolve('test/files/footPrintReportE2EAssertion.xls'));
				assert.equal(actualFile.toString(),expectedFile.toString());

				done();
				
			});
	});
});

/**
 *
 */
function createDirectories() {
	if (!fs.existsSync(process.env.REPORT_DIR)) {
		fs.mkdirSync(process.env.REPORT_DIR);
	}

	if (!fs.existsSync(process.env.UPLOAD_DIR)) {
		fs.mkdirSync(process.env.UPLOAD_DIR);
	}
}

