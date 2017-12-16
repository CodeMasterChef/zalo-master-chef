module.exports = function(ZOAClient, data, responseAI){
    var module = {};
    var common = require('./common.js')(ZOAClient);

    var a = data.find(f=>f.name.toLowerCase().indexOf(responseAI['name'][0].value.toLowerCase()));
    console.log(a);

    return module;
}