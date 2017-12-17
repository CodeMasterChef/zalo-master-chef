module.exports = function (ZOAClient, userId, data, responseAI) {
    var module = {};
    var common = require('./common.js')(ZOAClient);
    var helper = require('./helper.js')();

    module.execute = function () {
        var productNameList = responseAI.name;
       
        if(productNameList == undefined) {
            var productName = helper.getCache(userId).productName;
            var product = null;
            for (let i = 0; i < data.length; i++) {
                if (data[i].name) {
                    if (data[i].name.toLowerCase() === productName.toLowerCase()) {
                        product = data[i];
                    }
                }
            }
            if (product && product.fullSaleInfo && product.fullSaleInfo.policy) {
                var stringResponse = helper.convertObjectTParagraph(product.fullSaleInfo.policy);
                stringResponse = "Thông tin bảo hành của " + product.name + "\n" + stringResponse;
                common.sendTextMessage(userId, stringResponse);
            } else { 
                common.sendTextMessage(userId, "Rất tiếc. Không có thông tin bảo hành của sản phẩm " + productName);
            }   
            return;
        }
        // multiple select
        productNameList.forEach(element => {
            var queryProductName = element.value;
            var keyword = element.value.toLowerCase();
            var product = null;
            for (let i = 0; i < data.length; i++) {
                if (data[i].name) {
                    var productName = data[i].name.toLowerCase();
                    if (productName === keyword) {
                        product = data[i];
                    }
                }
            }
            if (product && product.fullSaleInfo && product.fullSaleInfo.policy) {
                var stringResponse = helper.convertObjectTParagraph(product.fullSaleInfo.policy);
                stringResponse = "Thông tin bảo hành của " + product.name + "\n" + stringResponse;
                common.sendTextMessage(userId, stringResponse);
            }
            else {
                common.sendTextMessage(userId, "Rất tiếc. Không có thông tin bảo hành của sản phẩm " + queryProductName);
            }           
        });

    }

    return module;
}