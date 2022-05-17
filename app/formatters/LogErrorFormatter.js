'use strict';
class LogErrorFormatter {
	/**
	 * @param {Error} error 
	 * @returns {string}
	 */
	static execute(error) {
		if (typeof error !== 'object' || !(error instanceof Error)) {
			throw Error('only type Error can be formatted');
		}

		const arrayStack = error.stack.split('\n    ');
		const jsonStack = {};

		for (let i=0;i<arrayStack.length;i++) {
			jsonStack[i] = arrayStack[i];
		}

		return jsonStack;
	}
}

module.exports = LogErrorFormatter;
