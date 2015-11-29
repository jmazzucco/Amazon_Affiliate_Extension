chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if( details.url == "http://www.amazon.com/" || details.url == "https://www.amazon.com/")
            return {redirectUrl: "https://www.amazon.com/foo" };
    },
    {urls: ["*://www.amazon.com/*"]},
    ["blocking"]);

