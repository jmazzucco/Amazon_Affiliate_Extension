chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.param) {

    //append current URL with symbols before adding the param
    url = window.location.href
    if(url.endsWith('amazon.com')){
    	url = url + '/?'
    }

    if(url.indexOf('?') == -1){
    	url = url + "?"
    }

    //append current URL with the param
    window.location.href = url +'&tag'+ msg.param;
  };
});