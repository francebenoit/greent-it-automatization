'use strict'

const GreenITDataExcelGenerator = require("./GreenITDataExcelGenerator");
const GreenItDataBuilder = require("../../builders/GreenITDataWrapperBuilder");
const Interface = require("../../Interface");
const FileGeneratorInterface = require('./FileGeneratorInterface');


class FileGenerator {
    constructor(greenItDataBuilder, executor = null) {
        this.greenItDataBuilder = new GreenItDataBuilder();
        this.executor = executor ? executor : new GreenITDataExcelGenerator();
        Interface.checkImplements(this.executor, FileGeneratorInterface);
    }

    /**
     *
     * @param {string} csvPath
     * @param {string} filename
     */
    async execute(csvPath, filename) {
         var greenItData = await this.greenItDataBuilder.execute(csvPath);

         await this.executor.createFile(greenItData,filename);
    }

    getFilename() {
      return this.executor.getFilename();
    }
}

module.exports = FileGenerator;