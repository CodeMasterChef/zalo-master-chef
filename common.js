module.exports = {
    sendTextMessage: function (userId, message) {
        ZOAClient.api('sendmessage/text', 'POST', { uid: userId, message: message }, function (response) {
            console.log(response);
        });
    },
    sendImageMessage: function (userId, message, imageId) {
        ZOAClient.api('sendmessage/image', 'POST', { uid: userId, message: message, imageid: imageId }, function (response) {
            console.log(response);
        });
    },

    sendLinkMessage: function (userId, links) {
        var params = {
            uid: userId,
            links: links
        };

        ZOAClient.api('sendmessage/links', 'POST', params, function (response) {
            console.log(response);
        });
    },

    sendInteractionMessage: function (userId, actions) {
        var params = {
            uid: userId,
            actionlist: actions
        };

        ZOAClient.api('sendmessage/actionlist', 'POST', params, function (response) {
            console.log(response);
        });
    },

    sendSMSMessage: function (phoneNo, templateId, templateData) {
        var params = {
            phone: phoneNo,
            templateid: templateId,
            templatedata: {}
        };

        ZOAClient.api('sendmessage/phone/cs', 'POST', params, function (response) {
            console.log(response);
        });
    },

    sendCustomerCareMessage: function (userId, templateId, templateData) {
        var params = {
            uid: userId,
            templateid: templateId,
            templatedata: {}
        };

        ZOAClient.api('sendmessage/cs', 'POST', params, function (response) {
            console.log(response);
        });
    },

    replyTextMessage: function (messageId, message) {
        ZOAClient.api('sendmessage/reply/text', 'POST', { msgid: messageId, message: message }, function (response) {
            console.log(response);
        });
    },

    replyImageMessage: function (messageId, imageId, message) {
        ZOAClient.api('sendmessage/reply/image', 'POST', { msgid: messageId, imageid: imageId, message: message }, function (response) {
            console.log(response);
        });
    },

    replyLinkMessage: function (messageId, link) {
        ZOAClient.api('sendmessage/reply/links', 'POST', { msgid: messageId, links: link }, function (response) {
            console.log(response);
        });
    }
}