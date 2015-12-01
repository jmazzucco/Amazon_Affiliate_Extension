chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var portal = "foo"

        if( details.url == "http://www.amazon.com/" || details.url == "https://www.amazon.com/")
            return {redirectUrl: "https://www.amazon.com/" + portal };
    },
    {urls: ["*://www.amazon.com/*"]},
    ["blocking"]);

