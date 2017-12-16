
var express = require('express');
var ZaloOA = require('zalo-sdk').ZaloOA;

var oaid = process.env.OAID;
var secretKey = process.env.SECRET_KEY;
console.log(oaid);
console.log(secretKey);
const server = express();
var zaConfig = {
  oaid: oaid,
  secretkey: secretKey
}
var ZOAClient = new ZaloOA(zaConfig);

server.get('/', (req, res) => {
  res.send('Hello World! ', oaid, secretKey);
  console.log("Server is started");
})
server.get('/webhook', (req, res) => {
  console.log("User had send a message.")
  var data = req.query;
  var message = data.message;
  var userId = data.fromuid;
  console.log(data);
  console.log(req);
  console.log(message, userId);
  // lấy thông tin người dùng 
  ZOAClient.api('getprofile', { uid: userId }, function (response) {
    var userProfile = response.data;
    var message = userProfile.displayName;
    sendTextMessage(userId, "Xin chào bạn " + message);
  });
})

function sendTextMessage(userId, message) {
  ZOAClient.api('sendmessage/text', 'POST', { uid: userId, message: message }, function (response) {
    ZOAClient.api('getmessagestatus', { msgid: data.msgId }, function (response) {
      console.log(response);
    });
  });
}

var listener = server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
  console.log("Server listening at: " + listener.address().address + ":" + listener.address().port);
});
