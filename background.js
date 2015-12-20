// the extension seems to be crashing the browser. Add code that only adds listeners to the active tab, not all tabs

var param;
var changeUrl = false;
var amazonStatus = false;

  var updatedListener = function(tabId,changeInfo,tab){
  //need to add: if url already contains a URL param but the param doesn't match the one being passed from addListener, remove the old param (everything proceeding the '?') and add the new one.

  //always add the parameter if the URL is "http://www.amazon.com/"
  if (changeInfo.url == "http://www.amazon.com/"){
    changeUrl = true;
    amazonStatus = true;

  //if the previous URL did not contain "www.amazon.com", the param needs to be added
  }else if((changeInfo.url) && (changeInfo.url.indexOf("www.amazon.com") > -1) && (amazonStatus === false)){
      changeUrl = true;
      amazonStatus = true;

  //if the previous URL did contain "www.amazon.com", the param does not need to be added
  }else if ((changeInfo.url) && (changeInfo.url.indexOf("www.amazon.com") == -1)){
      amazonStatus = false;
  };

  //send param to content.js if changeUrl is True and the page has finished loading
  if ((changeInfo.status == 'complete') && (changeUrl == true)) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
       chrome.tabs.sendMessage(tabs[0].id, {param: param}, function(response) {
       });
    });
    changeUrl = false;
  }
};

//reload current tab
var reload = function(addedTabId, removedTabId){
  chrome.tabs.getSelected(null,function(tab) {
    if(tab.url.indexOf("www.amazon.com") > -1){
      chrome.tabs.reload(addedTabId);
      changeUrl = true;
      amazonStatus = true;
    };
  });
};

//when background.js loads, get the Affiliate Link of the selected object and pass it to the listeners
function paramFromStorage(){
  chrome.storage.sync.get(null, function(items) {
    param = (items[items.selected]);
    console.log("storage " + param)
    listeners(param);
  });
  newParam();
};

//when a new parameter is received from popup.js, pass it to the listeners
function newParam(){
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
     if (request.param != param){
      param = request.param
      console.log("onMessage " + param)
      listeners(param);
     };
  });
};

function listeners(param){
  //if Chrome prefetches resources when manually entering a different URL, reload the page so that URL change can be caught by the onUpdated listener
  function preloadCheck(){
    chrome.tabs.onReplaced.addListener(reload);
  };

  //catch any changes made to the URL of the active tab
  function addListener(param){
    chrome.tabs.onUpdated.addListener(updatedListener);
  };

  //remove all listeners (except for onMessage) and add them again using the new parameter
  function removeListeners(){
    chrome.tabs.onUpdated.removeListener(updatedListener);
    chrome.tabs.onReplaced.removeListener(reload);

    //add listeners if param has a value
    if (param != undefined){
      preloadCheck();
      addListener(param);
    };
  }

  removeListeners();
};


paramFromStorage();