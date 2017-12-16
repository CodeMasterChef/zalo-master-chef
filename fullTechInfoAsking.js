module.exports = function(ZOAClient, userId , data, responseAI){
    var module = {};
    var common = require('./common.js')(ZOAClient);
    var helper = require('./helper.js')();
    module.execute  = function () {

            var productName = (responseAI.name[0]) ?  responseAI.name[0].value : helper.getCache(userId).productName;
           
            var keyword = productName.toLowerCase();
            var product = null;
            for(let i = 0 ; i < data.length ; i++) {
                if(data[i].name) {
                    var productName = data[i].name.toLowerCase();  
                    if(productName.indexOf(keyword) !== -1) {
                        product = data[i];
                        break;
                    }
                }
            }
            if(product) {
                var stringData = JSON.stringify(product.fullTechInfo);
                var stringResponse = stringData.replace(/[{}]/g, '\n');
                stringResponse = stringResponse.replace(/\",/g, '\n');
                stringResponse = stringResponse.replace(/\"/g, '');
                stringResponse = "Thông số kĩ thuật của " + productName + " " + stringResponse;
                common.sendTextMessage(userId , stringResponse); 
            }
            else {
                 common.sendTextMessage(userId, "Rất tiếc. Không có thông tin kĩ thuật của sản phẩm."); 
            }
         
       
    }
    
    return module;
}