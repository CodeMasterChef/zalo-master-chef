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
            if (product && product.price) {
                var stringResponse = helper.convertObjectTParagraph(product.price);
                stringResponse = "Giá của sản phẩm " + product.name + " là: " + stringResponse;
                common.sendTextMessage(userId, stringResponse);
            } else { 
                common.sendTextMessage(userId, "Rất tiếc. Không có thông tin về giá của sản phẩm " + productName);
            }   
            return;
        }
        
        // multiple searching
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
            if (product && product.price) {
                var stringResponse = helper.convertObjectTParagraph(product.price);
                stringResponse = "Giá của sản phẩm " + product.name + " là: " + stringResponse;
                common.sendTextMessage(userId, stringResponse);
            }
            else {
                if(element.entities && element.entities.trademark 
                    &&  element.entities.trademark[0].value
                    && element.entities.trademark[0].value.toLowerCase() =='iphone') {
    
                        let isExist = false;
                        for(var i = 0 ; i < global.cache.length ; i++) {
                            if(global.cache[i].userId == userId) {
                                global.cache[i].productName = queryProductName;
                                isExist = true;
                                break;
                            }
                        }
                        if(!isExist) {
                            global.cache.push( { userId : userId , productName :queryProductName });
                        }

                        common.sendTextMessage(userId, "Bạn có thể cho tôi biết thêm về dung lượng bộ nhớ là 32GB hay 64GB hay 128GB của " + queryProductName + " không?");  
                    }
                else { 
                    common.sendTextMessage(userId, "Rất tiếc. Không có thông tin về giá của sản phẩm " + queryProductName);
                }    
               
            }           
        });

    }

    return module;
}