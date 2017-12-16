
var express = require('express');
var ZaloOA = require('zalo-sdk').ZaloOA;
var request = require('request');

var jsonFile = require('./final-rel-path.json');

// constant
var MUA_HANG = 'mua hàng';
var TU_VAN = 'tư vấn';
var GIA_MAT_HANG = 'giá mặt hàng';
var LOAI_MAT_HANG = 'loại mặt hằng';
var THONG_SO_KY_THUAT = 'thông số kỹ thuật';
var THONG_TIN_BO_SAC = 'thông tin bộ sạc';
var THONG_TIN_THIET_BI = 'thông tin thiết bị';
var THONG_TIN_THE_NHO = 'thông tin thẻ nhớ';
var THONG_TIN_SAN_PHAM = 'thông tin sản phẩm';
var THONG_TIN_THIET_BI_LUU_TRU = 'thông tin thiết bị lưu trữ';
var MAN_HINH_HIEN_THI = 'màn hình hiển thị';
var CAU_HINH_CHI_TIET = 'cấu hình chi tiết';
var THONG_SO_VAT_LY = 'thông số vật lý';
var KET_NOI_TINH_NANG = 'kết nối và tính năng';
var THRESHOLD = 0.85;

console.log(oaid);
console.log(secretKey);

const server = express();
server.use('/public', express.static('public'));
var oaid = process.env.OAID;
var secretKey = process.env.SECRET_KEY;

var zaConfig = {
  oaid: oaid,
  secretkey: secretKey
}
var ZOAClient = new ZaloOA(zaConfig);
var common = require('./common.js')(ZOAClient);

server.get('/', (req, res) => {
  res.send('Hello World! ', oaid, secretKey);
  console.log("Server is started");
});

// https.get('./final-rel-path.json', (req, res) => {
//   console.log(req);
// });

server.get('/webhook', (req, res) => {
  console.log("User had send a message.");
  var data = req.query;
  var message = data.message;
  var userId = data.fromuid;
  console.log(message, userId);
  // lấy thông tin người dùng 
  ZOAClient.api('getprofile', { uid: userId }, function (response) {
    var options = {
      url: 'https://api.wit.ai/message?v=16/12/2017&q=' + message,
      headers: {
        'Authorization': 'Bearer 6ACPVMBT56A2L3IYAJHKBRQQO2YCH6TN'
      }
    };

    request(options, function (error, response, body) {
      // var result = JSON.parse(response.entities);
      console.log(response);
      // console.log(result);
      // if (response['priceAsking'].confidence > THRESHOLD) {
      //   switch (key) {
      //     case value:

      //       break;

      //     default:
      //       break;
      //   }
      // } else {
      //   common.sendTextMessage();
      // }
    });
  });
})



var listener = server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
  console.log("Server listening at: " + listener.address().address + ":" + listener.address().port);
});
