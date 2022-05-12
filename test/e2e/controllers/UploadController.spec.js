'use strict';

require('custom-env').env();

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const path = require ('path');
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
		chai
			.request(requestUrl)
			.post('/')
			.attach('csv', path.resolve('./test/files/ecoindex.csv'), 'ecoIndex.csv')
			.end((err, res) => {
				assert.equal(res.status,200);
				assert.ok(fs.existsSync(path.resolve('footPrintReport.xls')));

				const actualFile = fs.readFileSync(path.resolve('footPrintReport.xls'));
				const expectedFile = fs.readFileSync( path.resolve('test/files/footPrintReportE2EAssertion.xls'));

				assert.equal(actualFile.toString(),expectedFile.toString());

				done();
			});
	});
});