'use strict';
const https = require('https');

class SimilarWeb {
	async getTotalVisitPerMonth(url) {
		try {
			const httpPromise = getApiCallPromise();
			let responseBody = await httpPromise;
			responseBody = JSON.parse(responseBody);

			return responseBody.engagement.totalVisits;
		}
		catch(error) {
			console.log(error);
		}

		/**
		 * @returns {Promise}
		 */
		function getApiCallPromise() {
			const apiKey = process.env.SIMILAR_WEB_API_KEY;

			return new Promise((resolve, reject) => {
				const options = {
					'method': 'GET',
					'hostname': 'similarweb2.p.rapidapi.com',
					'port': null,
					'path': '/trafficoverview?website='+url,
					'headers': {
						'X-RapidAPI-Host': 'similarweb2.p.rapidapi.com',
						'X-RapidAPI-Key': apiKey,
						'useQueryString': true
					}
				};

				https.get(options, (response) => {
					const chunks_of_data = [];

					response.on('data', (fragments) => {
						chunks_of_data.push(fragments);
					});

					response.on('end', () => {
						const response_body = Buffer.concat(chunks_of_data);
						resolve(response_body.toString());
					});

					response.on('error', (error) => {
						reject(error);
					});
				});
			});
		}
	}
}
 
module.exports = SimilarWeb;