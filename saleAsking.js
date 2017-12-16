module.exports = function (ZOAClient, userId, data, responseAI) {
    var module = {};
    var common = require('./common.js')(ZOAClient);
    var message = '';

    module.excute = function () {
        var isExisted = null;
        var keyword = responseAI.name[0].value;
        if (responseAI.hasOwnProperty('name')) {
            isExisted = data.find(f => f.name.toLowerCase().indexOf(keyword.toLowerCase()));
            console.log(isExisted);
        }
        if (isExisted) {
            message = 'Có! Mua không?';
        } else {
            message = 'Rất tiếc! Chúng tôi hiện không mặt hàng ' + keyword;
        }
        common.sendTextMessage(userId, message);
    }

    return module;
}