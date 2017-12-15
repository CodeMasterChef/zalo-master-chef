
var express = require('express');
var ZaloOA = require('zalo-sdk').ZaloOA;
 
const server = express(); 
var zaConfig = {
    oaid: '3726559350739287571',
    secretkey: 'Q72RCPL86JUZ4RyGM4Mi'
}
var ZOAClient = new ZaloOA(zaConfig);

server.get('/', (req, res) => 
{
  res.send('Hello World!');
  console.log("Server is started");
})
server.get('/webhook', (req, res) =>  { 
  console.log("User had send a message.")
  var data = req.query; 
  var message = data.message;
  var userId = data.fromuid;
  console.log(message , userId );
  // lấy thông tin người dùng 
  ZOAClient.api('getprofile', { uid: userId }, function(response) {
    var userProfile = response.data; 
    var message = userProfile.displayName;
    sendTextMessage(userId, "Xin chào: " + message);
  })
})

function sendTextMessage(userId, message) {
   ZOAClient.api('sendmessage/text', 'POST', {uid: userId, message: message}, function(response) {
  })
}
  
var listener = server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Server listening at: " + listener.address().address+":"+ listener.address().port );
});
