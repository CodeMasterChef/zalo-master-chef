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
      links: links
      // [{
      //   link: 'https://developers.zalo.me/',
      //   linktitle: 'Zalo For Developers',
      //   linkdes: 'Document For Developers',
      //   linkthumb: 'https://developers.zalo.me/web/static/images/bg.jpg'
      // }]
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