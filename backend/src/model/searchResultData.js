class SearchResultData {
    constructor(result = [], size = 0, limit = 10) {
        this.result = result;
        this.size = size;
        this.limit = limit;
    }
}

module.exports = { SearchResultData };