const GeoTag = require("./geotag");

class Paging{
    static PAGE_SIZE = 5.0

    static getPageSize(){
        return Paging.PAGE_SIZE;
    }

    /**
     * 
     * @param {GeoTag[]} tagList 
     * @param {int} pageNumber 
     * @returns {GeoTag[]}
     */
    static getPage(tagList, pageNumber) {
        let pageSize = Paging.getPageSize();
        let basicPageOffset = pageNumber*pageSize;
        let endOffPageIndex = basicPageOffset+pageSize;
        if (endOffPageIndex >= tagList.length) {
            endOffPageIndex = tagList.length;
        }
  
        return tagList.slice(basicPageOffset, endOffPageIndex)
    }
}

module.exports = Paging