chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.param) {
    //append current URL with the param
    url = window.location.href
    if(url.endsWith('amazon.com')){
    	url = url + '/?'
    } else if (url.endsWith('amazon.com/')) {
    	url = url + '?'
    };

    window.location.href = url +'&'+ msg.param;
  };
});