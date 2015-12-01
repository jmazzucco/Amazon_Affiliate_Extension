chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var portal = "?&tag=foobar-20";
        var url = details.url;

        if( (url.indexOf("amazon.com")) >= 0 && (url.indexOf(portal) < 0) )
          return {redirectUrl: url + portal};
    },
    {urls: ["*://www.amazon.com/*"]},
    ["blocking"]);

