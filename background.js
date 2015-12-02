function getPortalLink(){
    chrome.storage.sync.get(null, function(items) {
	    var allKeys = Object.keys(items);
	   	portal = items[allKeys[0]];
	   	concatAndRedirect(portal);
	  });
};

function concatAndRedirect(portal){
	chrome.webRequest.onBeforeRequest.addListener(
	    function(details) {
	        var url = details.url;
	        if( (url.indexOf("amazon.com")) >= 0 && (url.indexOf(portal) < 0) )
						return {redirectUrl: url + portal};
	    },
	  	{urls: ["*://www.amazon.com/*"]},
	  	["blocking"]
	);
};

getPortalLink()