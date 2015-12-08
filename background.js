// get current param from storage
var param;
var changeUrl = false;
var amazonStatus = false;

var updatedListener = function(tabId,changeInfo,tab){
    	//need to add: if url already contains a URL param but the param doesn't match the one being passed from addListener, remove the old param (everything proceeding the '?') and add the new one.

    	if (changeInfo.url == "http://www.amazon.com/"){
    		changeUrl = true;
	    	amazonStatus = true;

    	}else if((changeInfo.url) && (changeInfo.url.indexOf("www.amazon.com") > -1) && (amazonStatus === false)){

	    		changeUrl = true;
	    		amazonStatus = true;
	    } else if ((changeInfo.url) && (changeInfo.url.indexOf("www.amazon.com") == -1)){
	    		amazonStatus = false;
	    };

	    if ((changeInfo.status == 'complete') && (changeUrl == true)) {
	      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	         chrome.tabs.sendMessage(tabs[0].id, {param: param}, function(response) {
	         });
	      });
	      changeUrl = false;
			}
};

var reload = function(addedTabId, removedTabId){
		chrome.tabs.getSelected(null,function(tab) {
 		if(tab.url.indexOf("www.amazon.com") > -1){
	 		chrome.tabs.reload(addedTabId);
	 		changeUrl = true;
		  amazonStatus = true;
		};
	});
};

function paramFromStorage(){
    chrome.storage.sync.get(null, function(items) {
	   	param = (items[items.selected]);
	   	listeners(param);
	  });

	  newParam();
};

function newParam(){
  chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	     if (request.param != param){
		   	param = request.param
		    listeners(param);
	     };
	});
};

function listeners(param){
	function preloadCheck(){
		chrome.tabs.onReplaced.addListener(reload);
	};

	function addListener(param){
		chrome.tabs.onUpdated.addListener(updatedListener);
	};

	function removeListeners(){
		chrome.tabs.onUpdated.removeListener(updatedListener);
		chrome.tabs.onReplaced.removeListener(reload);
		preloadCheck();
		addListener(param);
	}

	removeListeners();
};

paramFromStorage();