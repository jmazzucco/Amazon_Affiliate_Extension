// get current param from storage
// function getPortalLink(){
//     chrome.storage.sync.get(null, function(items) {
// 	    var allKeys = Object.keys(items);
// 	   	portal = items[allKeys[0]];
// 	   	concatAndRedirect(portal);
// 	  });
// };

// // recieve message from popup.js if a new param is set
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	// console.log(request.site);
//     if (request.afParam != afParam){
//     	afParam = request.afParam
//     	resetMe();
//     	concatAndRedirect(afParam);
//     };
var changeUrl = false;
var amazonStatus = false;

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId)
 {
 		chrome.tabs.getSelected(null,function(tab) {
	 		if(tab.url.indexOf("www.amazon.com") > -1){
		 		alert("reloading..")
		 		chrome.tabs.reload(addedTabId);
		 		changeUrl = true;
			  amazonStatus = true;
			};
		});
 });

//send message to content.js when a tab loads the Amazon site
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	console.log("dont give up!")
    	if((changeInfo.url) && (changeInfo.url.indexOf("www.amazon.com") > -1) && (amazonStatus === false)){
	    		changeUrl = true;
	    		amazonStatus = true;
	    } else if ((changeInfo.url) && (changeInfo.url.indexOf("www.amazon.com") == -1)){
	    		amazonStatus=false;
	    };

	    if ((changeInfo.status == 'complete') && (changeUrl == true)) {
	      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	         chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt"}, function(response) {
	         });
	      });
	      changeUrl = false;
			}
});