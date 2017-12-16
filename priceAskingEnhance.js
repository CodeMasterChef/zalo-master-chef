module.exports = function (ZOAClient, userId, data, responseAI) {
    var module = {};
    var common = require('./common.js')(ZOAClient);
    var helper = require('./helper.js')();

    module.execute = function (updatedMemory) {
        var currentData = global.cache.find(p => p.userId == userId);
        var queryProductName = (currentData.productName + ' ' + updatedMemory);
        var product = null;
        for (let i = 0; i < data.length; i++) {
            if (data[i].name) {
                var productName = data[i].name.toLowerCase();
                if (productName.toLowerCase() == queryProductName.toLowerCase()) {
                    product = data[i];
                }
            }
        }
        if (product && product.price) {
            var stringResponse = helper.convertObjectTParagraph(product.price);
            stringResponse = "Giá của sản phẩm " + product.name + " là: " + stringResponse;
            common.sendTextMessage(userId, stringResponse);
        }
        else {
            common.sendTextMessage(userId, "Rất tiếc. Không có thông tin về giá của sản phẩm " + queryProductName);
        }




    }

    return module;
}