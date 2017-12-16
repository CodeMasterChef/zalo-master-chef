module.exports = function (ZOAClient, userId, data, responseAI) {
    var module = {};
    var common = require('./common.js')(ZOAClient);
    var helper = require('./helper.js')();

    module.execute = function () {
        var productName = responseAI.name[0].value;
        var message = `Bạn muốn tư vấn thông gì về ${productName} : \n `;
        message+=`Thông tin kĩ thuật \n `;
        message+=`Chính sách bảo hành \n `;
        message+=`Giá sản phẩm \n `;

        common.sendTextMessage(userId, message);
        helper.setCache(userId, 'productName' , productName );
       
    }

    return module;
}