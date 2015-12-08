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

    onclickEvents();
  });
};

function sendMessage(urlParam){
  //send new param to background.js
  chrome.runtime.sendMessage({param: urlParam});
};

function onclickEvents(){

    var items = document.getElementsByClassName('items');
    for(var i=0; i<items.length; i++)(function(i){
      //add an onclick event listener for each radio item
      items[i].onclick = function() {
        //when a radio item is clicked, set the 'selected' objects value as the elements id
        chrome.storage.sync.set({"selected": items[i].id});
        affiliateList();
      }
    })(i);

    var delete_btns = document.getElementsByClassName('delete');
    for(var i=0; i<delete_btns.length; i++)(function(i){
      //add an onclick event listener for each delete button
      delete_btns[i].onclick = function() {
        //when a delete button is clicked, delete the associated object in storage
        chrome.storage.sync.remove(delete_btns[i].id);
        affiliateList();
      }
    })(i);

    document.getElementById('save').onclick = function() {
      var name = document.getElementById('name').value;
      var link = document.getElementById('link').value;
      //if both inputs contain a value, save the values as new object in storage
      if(name && link){
        var newObj = {};
        newObj[name] = link;
        chrome.storage.sync.set(newObj);
        affiliateList();
      };
    };
};

affiliateList();