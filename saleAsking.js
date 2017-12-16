module.exports = function(ZOAClient, data, responseAI){
    var module = {};
    var common = require('./common.js')(ZOAClient);

    var a = data.find(f=>f.name.toLowerCase().indexOf(responseAI['name'].value.toLowerCase()));
    console.log(a);

    return module;
}