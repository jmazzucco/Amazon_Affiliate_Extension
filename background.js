// get current param from storage
var param;
var changeUrl = false;
var amazonStatus = false;

var updatedListener = function(tabId,changeInfo,tab){
			// console.log("updatedListener")
			// console.log(param);
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
	console.log("reloading")
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