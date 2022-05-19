const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const FILE_NAME = '_footprintReport.png';
const MEDIAN = {
	'domSize' : 600,
	'requestNumber' : 78,
	'size' : 1400
};
const WIDTH = 1200;
const HEIGHT = 630;
const COLORS  = {
	'title' : '#203361',
	'white' : '#fff',
	'black' : '#000',
	'table' : '#86D5E2',
	'valueOk' : '#42B150',
	'valueKo' : '#FF0000',
	'total' : '#00AFCB',
	'equivalence' : '#45516E'
};

const IMAGE_BOTTOM_HEIGHT = 150;

class GreenITDataImageGenerator {
	/*
	 * @returns {string}
	 */
	getFileName() {
		return FILE_NAME;
	}

	/**
	 * @param {GreenITDataWrapper} greenItData
	 * @param {string} filename
	 */
	async createFile(greenItData, filename) {
		const { context, canvas } = initCanvas();
		const annualFootprint = greenItData.annualFootprint;
		const greenITDataAverage = greenItData.greenDataAverage;
		let currentHeightPosition = 0;

		drawTitle();
		drawAnnualTraffic();
		drawTable();
		drawBottomAndSave();

		/**
		 * @returns {JSON}
		 */
		function initCanvas() {
			const canvas = createCanvas(WIDTH, HEIGHT);
			const context = canvas.getContext('2d');

			context.fillStyle = COLORS.white;
			context.fillRect(0, 0, WIDTH, HEIGHT);

			return { context, canvas };
		}
    
		/**
		 * @returns {void}
		 */
		function drawTitle() {
			context.font = 'bold 20pt Menlo';
			context.textAlign = 'left';
			context.textBaseline = 'top';
			context.fillStyle = COLORS.title;

			const marginTop = 50;
			const marginRight = 50;
			const title = greenItData.baseUrl;
			context.fillText(title, marginRight, marginTop);

			updateCurrentPositionByHeight(marginTop);
			updateCurrentPositionByText(title);
		}

		/**
		 * @param {number} height
		 */
		function updateCurrentPositionByHeight(height) {
			currentHeightPosition+=height;
		}

		/**
		 * @param {string} text
		 */
		function updateCurrentPositionByText(text) {
			const textHeight = context.measureText(text).emHeightDescent;
			updateCurrentPositionByHeight(textHeight);
		}

		/**
		 * @returns {void}
		 */
		function drawAnnualTraffic() {
			context.font = '15pt Menlo';
			context.fillStyle = COLORS.black;
			const marginTop = 50;
			const marginLeft = 100;
			updateCurrentPositionByHeight(marginTop);
			const text = 'Traffic annuel du site : ' + formatNumber(annualFootprint.traffic);
			context.fillText( text , marginLeft, currentHeightPosition);
			updateCurrentPositionByText(text);
		}
        
		/**
		 * @returns {void}
		 */
		function drawTable() {
			const rectangleMargin = 200;
			const marginTopRectangle = 50;
			const rectangleHeight = 60;
			const rectangleWidth = WIDTH - 2 * rectangleMargin;
			drawTopRectangle();

			const columnWidth = rectangleWidth / 3;
			const offset = 50;
			drawTopRectangleText();

			drawBottomRectangle();
			drawBottomRectangleText();

			/**
			 *
			 */
			function drawTopRectangle() {
				context.fillStyle = COLORS.table;
				updateCurrentPositionByHeight(marginTopRectangle);
			
				context.fillRect(
					rectangleMargin,
					currentHeightPosition,
					rectangleWidth,
					rectangleHeight
				);
			}

			/**
			 *
			 */
			function drawTopRectangleText() {
				context.font = '12pt Bold Menlo';
				context.textAlign = 'center';
				context.fillStyle = COLORS.white;
				const marginTopFirstLine = 10;
				const positionForFirstLine = currentHeightPosition + marginTopFirstLine;
				drawFirstLineByPosition('DOM',1);
				drawFirstLineByPosition('Nb requêtes',2);
				drawFirstLineByPosition('Poids de pages',3);
		
				const marginTopSecondLine = 20;
				const positionForSecondLine = positionForFirstLine + marginTopSecondLine;
				drawSecondLineByPosition(MEDIAN.domSize,1);
				drawSecondLineByPosition(MEDIAN.requestNumber,2);
				drawSecondLineByPosition(MEDIAN.size,3);
				
				/**
				 * @param {string} value
				 * @param {number} position
				 */
				function drawFirstLineByPosition(value,position) {					
					context.fillText(value, columnWidth * position + offset, positionForFirstLine);
				}

				/**
				 * @param {number} value
				 * @param {number} position
				 */
				function drawSecondLineByPosition(value,position) {					
					context.fillText('(medianne = ' + value + ')', columnWidth * position + offset, positionForSecondLine);
				}
			}

			/**
			 *
			 */
			function drawBottomRectangle() {
				context.strokeStyle = COLORS.table;
				const lineWidth = 1;
				context.lineWidth = lineWidth;
				context.strokeRect(
					rectangleMargin + lineWidth,
					currentHeightPosition + rectangleHeight,
					rectangleWidth - 2 * lineWidth,
					rectangleHeight - 2 * lineWidth
				);
			}		

			/**
			 *
			 */
			function drawBottomRectangleText() {
				updateCurrentPositionByHeight(rectangleHeight);
				const marginTopBottomRectangle = 20;
				updateCurrentPositionByHeight(marginTopBottomRectangle);
			
				drawValueWithColors(greenITDataAverage.domSize,MEDIAN.domSize,1);
				drawValueWithColors(greenITDataAverage.requestNumber,MEDIAN.requestNumber,2);
				drawValueWithColors(Math.ceil(greenITDataAverage.sizeKb),MEDIAN.sizeKb,3);
				updateCurrentPositionByHeight(rectangleHeight);
			
				/**
				 *
				 * @param {number} value
				 * @param {number} median
				 * @param {number} position
				 */
				function drawValueWithColors(value,median,position) {
					if (value > median) {
						context.fillStyle = COLORS.valueKo;
					} else {
						context.fillStyle = COLORS.valueOk;
					}
					context.fillText(value, columnWidth * position + offset, currentHeightPosition);
				}
			}
		}
		
		/**
		 * @param {number} number
		 * @returns {number}
		 */
		function formatNumber(number) {
			if (number > 10000000) {
				return number.toExponential(2);
			}

			return Math.ceil(number);
		}

		/**
		 *
		 */
		function drawBottomAndSave() {
			const offset = 20;
			const marginTopToBeCentered = (HEIGHT - currentHeightPosition - IMAGE_BOTTOM_HEIGHT) / 2 - offset;
			updateCurrentPositionByHeight(marginTopToBeCentered);

			loadImage(path.resolve('images/legendBottom.png')).then(image => {
				const marginLeftImage = 55;
				context.drawImage(image, marginLeftImage, currentHeightPosition);

				let marginTop = 50;
				let marginRight = 255;
				drawTotals();
				drawEquivalences();

				saveFile();				

				/**
				 *
				 */
				function drawTotals() {
					context.textAlign = 'center';
					context.font = 'bold 15pt Menlo';
					context.fillStyle = COLORS.total;
					const tCO2 = formatNumber(annualFootprint.gesInTCO2) + ' tCO2e';
					context.fillText(tCO2, marginRight, currentHeightPosition + marginTop);

					marginTop += 70;

					const wL = formatNumber(annualFootprint.waterInL) + ' L';
					context.fillText(wL, marginRight, currentHeightPosition + marginTop);
				}

				/**
				 *
				 */
				function drawEquivalences() {
					context.fillStyle = COLORS.equivalence;
					const fontValue = '18pt bold Menlo';
					const fontLegend = '12pt Menlo';
					const marginTopEquivalences = 120;
					updateCurrentPositionByHeight(marginTopEquivalences);

					const textHeightFirstLine = 30;
					const marginTopEquivalencesSecondLine = currentHeightPosition + textHeightFirstLine;
					const textHeightSecondLine = 15;
					const marginTopEquivalencesThirdLine = marginTopEquivalencesSecondLine + textHeightSecondLine;
					drawCircleGlobeText();
					drawFrenchCitizenGesText();
					drawOlympicPoolText();

					/**
					 *
					 */
					function drawCircleGlobeText() {
						marginRight += 365;
						context.font = fontValue;
						const circleGlobe = formatNumber(annualFootprint.carCircleGlobe);
						context.fillText(circleGlobe, marginRight, currentHeightPosition);

						context.font = fontLegend;
						const circleGlobe2 = 'tours de la terre';
						context.fillText(circleGlobe2, marginRight, marginTopEquivalencesSecondLine);
						const circleGlobe3 = 'en voiture';
						context.fillText(circleGlobe3, marginRight, marginTopEquivalencesThirdLine);
					}

					/**
					 *
					 */
					function drawFrenchCitizenGesText() {
						marginRight += 235;
						context.font = fontValue;
						const frenchCitizenGES2 = formatNumber(annualFootprint.frenchCitizenGes);
						context.fillText(frenchCitizenGES2, marginRight, currentHeightPosition);

						context.font = fontLegend;
						const frenchCitizenGES = 'emission';
						context.fillText(frenchCitizenGES, marginRight, marginTopEquivalencesSecondLine);
						const frenchCitizenGES3 = 'd\'un français';
						context.fillText(frenchCitizenGES3, marginRight, marginTopEquivalencesThirdLine);
					}

					/**
					 *
					 */
					function drawOlympicPoolText() {
						marginRight += 230;
						context.font = fontValue;
						const olympicPool = formatNumber(annualFootprint.olympicSwimmingPool);
						context.fillText(olympicPool, marginRight, currentHeightPosition);

						context.font = fontLegend;
						const olympicPool2 = 'piscines';
						context.fillText(olympicPool2, marginRight, marginTopEquivalencesSecondLine);
						const olympicPool3 = 'olympiques';
						context.fillText(olympicPool3, marginRight, marginTopEquivalencesThirdLine);
					}
				}
			});
		}
		/**
		 * @returns {void}
		 */
		function saveFile() {
			const buffer = canvas.toBuffer('image/png');
			fs.writeFileSync(filename, buffer);
		}
	}
}

module.exports = GreenITDataImageGenerator;
