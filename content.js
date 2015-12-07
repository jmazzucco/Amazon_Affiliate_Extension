chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.action == 'SendIt') {

      window.location.href = window.location.href +'?TEST-20';
      msg.action = false;
   };
});