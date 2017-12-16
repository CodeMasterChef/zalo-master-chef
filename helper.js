module.exports = function () {
    var module = {};

    module.convertObjectTParagraph = function (object) {
        var stringData = JSON.stringify(object);
        var stringResponse = stringData.replace(/[{}]/g, '\n');
        stringResponse = stringResponse.replace(/\",/g, '\n');
        stringResponse = stringResponse.replace(/\"/g, '');
        return stringResponse;
    }

    module.setCache = function(userId ,  key , value) {
        let isExist = false;
        for(var i = 0 ; i < global.cache.length ; i++) {
            if(global.cache[i].userId == userId) {
                global.cache[i][key] = value;
                isExist = true;
                break;
            }
        }
        if(!isExist) {
            var data = {};
            data[key] = value;
            global.cache.push(data);
        }
    }
    module.getCache = function(userId) {
        for(var i = 0 ; i < global.cache.length ; i++) {
            if(global.cache[i].userId == userId) {
               return global.cache[i];
            }
        }
        return null;
    }

    return module;
}