 function affiliateList() {

  //get all objects in storage
  chrome.storage.sync.get(null, function(items) {

    //if all list items have been deleted, set the value of "selected" to "none"
    if (Object.keys(items).length === 1) {
      chrome.storage.sync.set({"selected": "none"});
    };
    var selectedName = items["selected"];

    if(items){
      //clear all child elements in 'radio_list' div
      document.getElementById('radio_list').innerHTML = "";

      //iterate through all objects
      for (var property in items){

        //ignore "selected" object
        if(!(property === "selected")) {

          //auto-select the first property
          if (items["selected"] === "none") {

            //update 'items' with new 'selected' value
            items["selected"] = property;

            //update 'selected' value in storage
            chrome.storage.sync.set({"selected": property});
          };

          //get new "selected" value
          var selectedName = items["selected"];

          //display objects in the radio_list div
          var newP = document.createElement("p");
          newP.innerHTML = "<input type='radio' class='items' name='radio_items' id='"+property+"'/><label for='radio_items'>"+property+"</label><button class='delete' id='"+property+"'>X</button>"
          document.getElementById('radio_list').appendChild(newP);

          //set radio button of selected object as checked
          if (document.getElementById(property).id === selectedName){
            document.getElementById(property).setAttribute("checked", "checked");
          };
        };
      };
     };

    var urlParam = items[items.selected];
    sendMessage(urlParam);

    listenForEvents();
  });
};

function sendMessage(urlParam){
  chrome.runtime.sendMessage({param: urlParam});
};

function listenForEvents(){

    var items = document.getElementsByClassName('items');
    for(var i=0; i<items.length; i++)(function(i){
      items[i].onclick = function() {
        var selectedObj = {};
        selectedObj["selected"] = items[i].id;
        chrome.storage.sync.set(selectedObj);
        affiliateList();
      }
    })(i);

    var delete_btns = document.getElementsByClassName('delete');
    for(var i=0; i<delete_btns.length; i++)(function(i){
      delete_btns[i].onclick = function() {
        var deleteName = delete_btns[i].id

        chrome.storage.sync.get(null, function(items) {
          var items = items;
          chrome.storage.sync.remove(deleteName);
          affiliateList();
        });
      }
    })(i);

    document.getElementById('save').onclick = function() {
      var name = document.getElementById('name').value;
      var link = document.getElementById('link').value;
      if(name && link){
        var obj = {};
        obj[name] = link;
        chrome.storage.sync.set(obj);
        affiliateList();
      };
    };
};

affiliateList();