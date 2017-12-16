module.exports = function(ZOAClient, data, responseAI){
    var module = {};
    var common = require('./common.js')(ZOAClient);

    var isExisted = data.find(f => f.name === responseAI.name[0].value.toLowerCase());
    console.log(isExisted);

    return module;
}