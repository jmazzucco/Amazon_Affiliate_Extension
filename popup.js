  function loadList() {
    chrome.storage.sync.get(null, function(items) {
      var allItems = items;

      //if Selected is the only object in storage, set it to "none"
      if (Object.keys(items).length === 1) {
        var updateSelected = {};
        updateSelected["selected"] = "none";
        chrome.storage.sync.set(updateSelected);
      };

      var selectedItem = allItems["selected"];

      if(allItems){
        document.getElementById('radio_list').innerHTML = "";

        for (var property in allItems){
          //add all stored object keys to radio list, expect for the "selected" object key


          if(!(property === "selected")) {

            // assign Selected to key of list item if only one exists
            if (allItems["selected"] === "none") {
              var updateSelected = {};
              updateSelected["selected"] = property;
              allItems["selected"] = property;
              chrome.storage.sync.set(updateSelected);
            };

            var selectedItem = allItems["selected"];
            var newP = document.createElement("p");
            newP.innerHTML = "<input type='radio' class='items' name='radio_items' id='"+property+"'/><label for='radio_items'>"+property+"</label><button class='delete' id='"+property+"'>X</button>"
            document.getElementById('radio_list').appendChild(newP);

            if (document.getElementById(property).id === selectedItem){
              document.getElementById(property).setAttribute("checked", "checked");
            };
          };
        };
       };

      var selectedProperty = allItems["selected"];
      var urlParam = allItems[selectedProperty];
      // console.log(selecedParameter);
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
          loadList();
        }
      })(i);

      var delete_btns = document.getElementsByClassName('delete');
      for(var i=0; i<delete_btns.length; i++)(function(i){
        delete_btns[i].onclick = function() {
          var deleteName = delete_btns[i].id

          chrome.storage.sync.get(null, function(items) {
            var allItems = items;
            chrome.storage.sync.remove(deleteName);
            loadList();
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
          loadList();
        };
      };
  };

  loadList();