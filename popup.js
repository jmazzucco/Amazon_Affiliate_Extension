$(document).ready(function(){

 function affiliateList() {

  //get all objects in storage
  chrome.storage.sync.get(null, function(items) {

    //if all list items have been deleted, set the value of "selected" to "none"
    if (Object.keys(items).length === 1) {
      chrome.storage.sync.set({"selected": "none"});
      document.getElementById('description_box').style.display = "block";
    } else {
      document.getElementById('description_box').style.display = "none";
    };

    if(items){
      //clear all child elements in 'radio_list' div
      document.getElementById('radio_list').innerHTML = "";

      //iterate through all objects
      for (var property in items){

        //ignore "selected" object
        if(!(property === "selected")) {

          //if 'selected' value doesn't exist as a key in items array, set first object key as new 'selected value'
          if (!items[items.selected]){
            items["selected"] = property;
            chrome.storage.sync.set({"selected": property});
          }

          var selectedName = items["selected"];
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
          var newDiv = document.createElement("div");
          newDiv.innerHTML =
          "<input type='radio' class='items' name='radio_items' id='"+property+"'/><label for='"+property+"'><span></span>"+property+"</label><button class='delete-box' id='"+property+"'><i class='but-icon fa fa-lg fa-times'></i></button><a href='#' data-toggle='popover' data-trigger='focus' data-placement='left' data-content='<b>Affiliate ID:</b><br/>"+items[property]+"' class='link-box' data-html='true'  data-param='"+items[property]+"'><i class='but-icon fa fa-lg fa-user'></i></a>"
          document.getElementById('radio_list').appendChild(newDiv);

          $('[data-toggle="popover"]').popover();

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

  var delete_btns = document.getElementsByClassName('delete-box');
  for(var i=0; i<delete_btns.length; i++)(function(i){
    //add an onclick event listener for each delete button
    delete_btns[i].onclick = function() {
      //when a delete button is clicked, delete the associated object in storage
      chrome.storage.sync.remove(delete_btns[i].id);
      affiliateList();
    }
  })(i);

  String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
  }

  function getParamFromLink(link){
    var tagindex = link.regexIndexOf(/tag=/i, 0);

    if (tagindex > -1){
      //get substring of all characters following and including 'tag='
      var firstSub = link.substring(tagindex + 4);

      //get index of first occurance of '&' in substring
      var ampIndex = firstSub.indexOf('&');

      if (ampIndex != -1){
        var finalSub = firstSub.substring(0, ampIndex);
      }else{
        return firstSub;
      }

    }else if (link.regexIndexOf(/tag%3D/i, 0) > -1){
      tagindex = link.regexIndexOf(/tag%3D/i, 0);

      //get substring of all characters following and including 'tag%3D'
      var firstSub = link.substring(tagindex + 6);

      //get index of first occurance of '%' in substring
      var percentIndex = firstSub.indexOf('%');

      if (percentIndex != -1){
        var finalSub = firstSub.substring(0, percentIndex);
      }else{
        return firstSub;
      }

    }

    if(tagindex === -1) {
      //return false if the link does not contain "tag=" or "tag%3D"
      return false
    }else{
      return finalSub;
    }

  };


  function clearForm() {
    document.getElementById("form").reset();
    error.innerHTML = "";
  }

  document.getElementById('save').onclick = function() {
    var totalItems = document.getElementsByClassName('items')
    var name = document.getElementById('name').value;
    var link = document.getElementById('link').value;
    var error = document.getElementById('error')

    if (totalItems.length >= 7){
      error.innerHTML = "Max of 7 affiliates"
      return;
    }

    //both inputs should have a value
    if(name && link){

       if(name.length >= 17){
         error.innerHTML = "Name cannot be over 16 characters"
         return;
        };

      //if a param exists in the given link
      var param = getParamFromLink(link);
      if(param){

        //only save if list less than 9 items are already in list

        //return if name already exists in the affiliate list
        if (document.getElementById(name)){
          error.innerHTML = "Name or link already exists"
          return;
        }

      } else {
        // return if param doesn't exists in the given link
        error.innerHTML = "Affiliate link is invalid";
        return;
      };

      //create new object with name and param and save it to storage

      var newObj = {};

      newObj[name] = param;
      chrome.storage.sync.set(newObj);

      affiliateList();
      clearForm();
    };
  };
};

affiliateList();

});
