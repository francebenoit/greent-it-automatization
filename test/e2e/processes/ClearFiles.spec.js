'use strict';

const fs = require('fs');
const spawnSync = require('child_process').spawnSync;
const assert = require('assert');

const REPORTS_DIR = 'reports';
const UPLOADS_DIR = 'uploads';

beforeEach(() => {
	createEmptyDirectories();
	generateNewFiles();
});

/**
 *
 */
function createEmptyDirectories() {
	spawnSync('rm', ['-rf', REPORTS_DIR]);
	spawnSync('rm', ['-rf', UPLOADS_DIR]);
	spawnSync('mkdir', [REPORTS_DIR]);
	spawnSync('mkdir', [UPLOADS_DIR]);
}

/**
 *
 * @param {string} name
 */
function generateNewFiles(name = 'new') {    
	spawnSync('touch', [REPORTS_DIR + '/' + name]);
	spawnSync('touch', [UPLOADS_DIR + '/' + name]);    
}

describe('ClearFiles', () => {
	it('should not clear newly created files in uploads and reports directories ', () => {   
		const clearFileCommand = spawnSync('node', ['app/processes/ClearFiles.js']);

		assert.equal(clearFileCommand.status, 0);
		assert.equal(fs.readdirSync(REPORTS_DIR).length, 1);
		assert.equal(fs.readdirSync(UPLOADS_DIR).length, 1);
	});

	it('should clear all files in uploads and reports directories when delay=false is passed ', () => {
		generateNewFiles('new1');
		const clearFileCommandWithNoDelay = spawnSync('node', ['app/processes/ClearFiles.js', 'delay=false']);

		assert.equal(clearFileCommandWithNoDelay.status, 0);
		assert.equal(fs.readdirSync(REPORTS_DIR).length, 0);
		assert.equal(fs.readdirSync(UPLOADS_DIR).length, 0);
       
	});
});


