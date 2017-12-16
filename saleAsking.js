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
        var isExisted = data.find(f => f.name ? f.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 : false);
        // console.log(isExisted);
        if (isExisted) {
            var actions = [{
                action: 'oa.query.hide',
                title: isExisted.category + ' - ' + isExisted.name,
                description: isExisted.price,
                thumb: 'https://95b85ba4.ngrok.io/public/images/' + isExisted.imgUrl,
                data: 'Tư vấn',
                popup: {
                    title: 'Lựa chọn',
                    desc: 'Thích thì sao ngại click để rinh ngay về nhà.',
                    ok: 'Tư Vấn',
                    cancel: 'Đặt Hàng'
                }
            }]
            common.sendInteractionMessage(userId, actions);
        } else {
            message = 'Rất tiếc! Chúng tôi hiện không mặt hàng ' + keyword + '.';
            common.sendTextMessage(userId, message);
        }
    }

    return module;
}