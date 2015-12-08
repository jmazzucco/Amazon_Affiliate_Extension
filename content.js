chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.param) {

      window.location.href = window.location.href +msg.param;
      msg.action = false;
   };
});