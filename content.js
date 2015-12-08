chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.param) {
    //append current URL with the param
    window.location.href = window.location.href + msg.param;
  };
});