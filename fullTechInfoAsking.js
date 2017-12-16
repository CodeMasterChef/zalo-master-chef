module.exports = function(ZOAClient, userId , data, responseAI){
    var module = {};
    var common = require('./common.js')(ZOAClient);
        
    module.execute  = function () {
        var keyword = responseAI.name[0].value.toLowerCase();
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
            common.sendTextMessage(userId ,  stringResponse); 
        }
        else {
             common.sendTextMessage(userId, "Rất tiếc. Không có thông tin kĩ thuật của sản phẩm."); 
        }
    }
    
    return module;
}