module.exports = function (ZOAClient, userId, data, responseAI) {
    var module = {};
    var common = require('./common.js')(ZOAClient);
    var message = '';

    module.excute = function () {
        if (!responseAI.hasOwnProperty('name')) {
            common.sendTextMessage(userId, 'Rất tiếc! Chúng tôi hiện không mặt hàng này.');
            return;
        }

        var keyword = responseAI.name[0].value;

        console.log(keyword);
        console.log(keyword.toLowerCase());

        var isExisted = data.find(f => f.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
        if (isExisted) {
            message = 'Có! Mua không?';
        } else {
            message = 'Rất tiếc! Chúng tôi hiện không mặt hàng ' + keyword + '.';
        }
        common.sendTextMessage(userId, message);
    }

    return module;
}