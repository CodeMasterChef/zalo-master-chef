module.exports = function () {
    var module = {};

    module.convertObjectTParagraph = function (object) {
        var stringData = JSON.stringify(object);
        var stringResponse = stringData.replace(/[{}]/g, '\n');
        stringResponse = stringResponse.replace(/\",/g, '\n');
        stringResponse = stringResponse.replace(/\"/g, '');
        return stringResponse;
    }

    return module;
}