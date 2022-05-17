'use strict';

const multer  = require('multer');
const upload = multer({ dest: process.env.UPLOAD_DIR });


module.exports = function (app) {
	const HomePageController = require('../controllers/HomePageController');
	const UploadController = require('../controllers/UploadController');

	app.route('/')
		.get(HomePageController.index);

	app.route('/')
		.post(upload.single('csv'),UploadController.execute);
};
