# GreenIT annual report automatization

This tool generates an eco audit per year according to the csv generated with GreenItAnalysis extension.  
Enter the file `ecoIndex.csv` on the main page and click the submit button. The annual footprint will be generated as an excel sheet.

## Install project
Create the file `.env` and fill the following parameters
```
APP_ENV=
SIMILAR_WEB_API_KEY=
PORT=
```
If needed, go to http://rapidapi.com  > similarweb and create an account to get the value for `SIMILAR_WEB_API_KEY`  

Then run
```
npm install
```
Go to http://127.0.0.1:PORT/ and start sheet generation

## Quality
`npm run ci` will run all the quality tools  
`npm run lint` runs eslint  
`npm run test:unit` runs unit tests  
`npm run test:e2e` runs e2e tests  
`npm run test` runs both unit and e2e tests  

## Tools
`npm run clear:uploaded-files` to remove all uploaded files. They are automatically removed except when an error occured.