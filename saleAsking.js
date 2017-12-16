module.exports = function (ZOAClient, userId, data, responseAI) {
    var module = {};
    var common = require('./common.js')(ZOAClient);
    var message = '';

    module.excute = function () {
        var isExisted;
        if (responseAI.hasOwnProperty('name'))
            isExisted = data.find(f => f.name.toLowerCase().indexOf(responseAI.name[0].value.toLowerCase()));
        if (isExisted) {
            message = 'Có';
        } else {
            message = 'Rất tiếc! Chúng tôi hiện không có mặt hàng này.';
        }
        common.sendTextMessage(userId, message);
    }

    return module;
}