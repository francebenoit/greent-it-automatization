'use strict';

const GreenDataAverage = require('../models/GreenITDataAverage');

const RANK_MAPPER_LETTER = ['A','B','C','D','E','F','G',];
const RANK_MAPPER_LETTER_TO_NUMBER = {'A': 0,'B': 1,'C': 2,'D': 3,'E': 4,'F': 5,'G': 6,};

class GreenITDataAverageBuilder {
	_requestNumberTotal = 0 ;
	_sizeKbTotal = 0;
	_domSizeTotal = 0;
	_ecoIndexTotal = 0;
	_rankTotal = 0;

	/**
	 * @param {GreenITDataWrapper} greenItData
	 * @returns {GreenDataAverage}
	 */
	execute(greenItData) {
		const webPageInformationList = greenItData.webPageInformationList;
		this.calculateSum(webPageInformationList);

		return this.buildGreenDataAverage(webPageInformationList.length);
	}


	/**
	 * @param {Array} webPageInformationList
	 */
	calculateSum(webPageInformationList) {
		webPageInformationList.forEach(webPageInformation => {
			this._requestNumberTotal += webPageInformation.requestNumber;
			this._sizeKbTotal += webPageInformation.sizeKb;
			this._domSizeTotal += webPageInformation.domSize;
			this._ecoIndexTotal += webPageInformation.ecoIndex;
			this._rankTotal += RANK_MAPPER_LETTER_TO_NUMBER[webPageInformation.rank];
		});
	}

	/**
	 * @param {number} webPageInformationNumber
	 * @returns {GreenDataAverage}
	 */
	buildGreenDataAverage(webPageInformationNumber) {
		const greenDataAverage = new GreenDataAverage();

		greenDataAverage.requestNumber = this._requestNumberTotal / webPageInformationNumber;
		greenDataAverage.sizeKb = this._sizeKbTotal / webPageInformationNumber;
		greenDataAverage.domSize = this._domSizeTotal / webPageInformationNumber;
		greenDataAverage.ecoIndex = Math.round(this._ecoIndexTotal / webPageInformationNumber  * 100) / 100;

		const rankAverageInNumber = this._rankTotal / webPageInformationNumber;
		greenDataAverage.rank = this.convertRankAverageToLetter(rankAverageInNumber);

		return greenDataAverage;
	}

	/**
	 * @param {number} rankAverageInNumber
	 * @returns {string}
	 */
	convertRankAverageToLetter(rankAverageInNumber) {
		const rankAverage = Math.ceil(rankAverageInNumber);

		return RANK_MAPPER_LETTER[rankAverage];
	}
}

module.exports = GreenITDataAverageBuilder;