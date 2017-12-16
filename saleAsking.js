module.exports = function (ZOAClient, userId, data, responseAI) {
    var module = {};
    var common = require('./common.js')(ZOAClient);
    var message = '';

    module.excute = function () {
        if (!responseAI.hasOwnProperty('name')) {
            common.sendTextMessage(userId, 'Rất tiếc! Chúng tôi hiện không mặt hàng này.');
            return;
        }

        console.log(data[0].name);
        var keyword = responseAI.name[0].value;
        var isExisted = data.find(f => f.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
        console.log(keyword);
        if (isExisted) {
            message = 'Có! Mua không?';
        } else {
            message = 'Rất tiếc! Chúng tôi hiện không mặt hàng ' + keyword + '.';
        }
        common.sendTextMessage(userId, message);
    }

    return module;
}