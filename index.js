
var express = require('express');
var ZaloOA = require('zalo-sdk').ZaloOA;

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

var oaid = process.env.OAID;
var secretKey = process.env.SECRET_KEY;
console.log(oaid);
console.log(secretKey);

const server = express();
server.use('/public', express.static('public'));

var zaConfig = {
  oaid: oaid,
  secretkey: secretKey
}
var ZOAClient = new ZaloOA(zaConfig);

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
    var userProfile = response.data;
    var message = userProfile.displayName;
    sendTextMessage(userId, "Xin chào bạn " + message);

    var links = [{
      link: 'https://developers.zalo.me/',
      linktitle: 'Sản phẩm',
      linkdes: 'abc',
      linkthumb: 'https://zalo-hackathon.herokuapp.com/public/images/42-56352-samsung-e1200-14-300x300.jpg'
    }]
    sendLinkMessage(userId, links);
  });
})

function sendTextMessage(userId, message) {
  ZOAClient.api('sendmessage/text', 'POST', { uid: userId, message: message }, function (response) {
    console.log(response);
  });
}

function sendImageMessage(userId, message, imageId) {
  ZOAClient.api('sendmessage/image', 'POST', { uid: userId, message: message, imageid: imageId }, function (response) {
    console.log(response);
  });
}

function sendLinkMessage(userId, links) {
  var params = {
    uid: userId,
    links: [{
      link: 'https://developers.zalo.me/',
      linktitle: 'Zalo For Developers',
      linkdes: 'Document For Developers',
      linkthumb: 'https://developers.zalo.me/web/static/images/bg.jpg'
    }]
  };

  ZOAClient.api('sendmessage/links', 'POST', params, function (response) {
    console.log(response);
  });
}

function sendInteractionMessage(userId, actions) {
  var params = {
    uid: userId,
    actionlist: [{
      action: 'oa.open.inapp',
      title: 'Send interactive messages',
      description: 'This is a test for API send interactive messages',
      thumb: 'https://developers.zalo.me/web/static/images/bg.jpg',
      href: 'https://developers.zalo.me',
      data: 'https://developers.zalo.me',
      popup: {
        title: 'Open Website Zalo For Developers',
        desc: 'Click ok to visit Zalo For Developers and read more Document',
        ok: 'ok',
        cancel: 'cancel'
      }
    }]
  };

  ZOAClient.api('sendmessage/actionlist', 'POST', params, function (response) {
    console.log(response);
  });
}

function sendSMSMessage(phoneNo, templateId, templateData) {
  var params = {
    phone: phoneNo,
    templateid: templateId,
    templatedata: {}
  };

  ZOAClient.api('sendmessage/phone/cs', 'POST', params, function (response) {
    console.log(response);
  });
}

function sendCustomerCareMessage(userId, templateId, templateData) {
  var params = {
    uid: userId,
    templateid: templateId,
    templatedata: {}
  };

  ZOAClient.api('sendmessage/cs', 'POST', params, function (response) {
    console.log(response);
  });
}

function replyTextMessage(messageId, message) {
  ZOAClient.api('sendmessage/reply/text', 'POST', { msgid: messageId, message: message }, function (response) {
    console.log(response);
  });
}

function replyImageMessage(messageId, imageId, message) {
  ZOAClient.api('sendmessage/reply/image', 'POST', { msgid: messageId, imageid: imageId, message: message }, function (response) {
    console.log(response);
  });
}

function replyLinkMessage(messageId, link) {
  ZOAClient.api('sendmessage/reply/links', 'POST', { msgid: messageId, links: link }, function (response) {
    console.log(response);
  });
}

var listener = server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
  console.log("Server listening at: " + listener.address().address + ":" + listener.address().port);
});
