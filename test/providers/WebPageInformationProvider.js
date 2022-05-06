const WebPageInformation = require("../../app/models/WebPageInformation");
const WebPageInformationBuilder = require("../../app/builders/WebPageInformationBuilder")

class WebPageInformationProvider {
    static getTestListData() {
        const webPageInformationBuilder = new WebPageInformationBuilder();

        return [
            webPageInformationBuilder.execute(
                '"https://www.apple.com/fr/macbook-air/specs/"',
                '83',
                '2359',
                '1284',
                '2.49',
                '3.74',
                '25.37',
                'E'
            ),
            webPageInformationBuilder.execute(
                'https://www.apple.com/fr/macbook-air/',
                '116',
                '9214',
                '1820',
                '2.78',
                '4.17',
                '10.9',
                'F'
            ),
            webPageInformationBuilder.execute(
                'https://www.apple.com/fr/mac/',
                '176',
                '7024',
                '1921',
                '2.89',
                '4.34',
                '5.43',
                'F'
            ),
        ];
    }
}

module.exports = WebPageInformationProvider;