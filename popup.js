	function loadList() {
		chrome.storage.sync.get(null, function(items) {
	    var allItems = items;
	    // assign key of first item is Selected object does not exist
	    if (!allItems["selected"]) {
    		var selectedObj = {};
				selectedObj["selected"] = Object.keys(items)[0];
				chrome.storage.sync.set(selectedObj);
	    };

	    var selectedItem = allItems["selected"];

		  if(allItems){
		  	document.getElementById('radio_list').innerHTML = "";

		   	for (var property in allItems){
	 				//add all stored object keys to radio list, expect for the "selected" object key
	 				if(!(property === "selected")) {
		 				var newP = document.createElement("p");
		 				newP.innerHTML = "<input type='radio' class='items' name='radio_items' id='"+property+"'/><label for='radio_items'>"+property+"</label><button class='delete' id='"+property+"'>X</button>"
		 				document.getElementById('radio_list').appendChild(newP);

		 				if (document.getElementById(property).id === selectedItem){
		 					document.getElementById(property).setAttribute("checked", "checked");
		 				};
		 			};
		   	};
			 };
	   	listenForEvents();
		});
	};

	function listenForEvents(){
			var items = document.getElementsByClassName('items');
			for(var i=0; i<items.length; i++)(function(i){
			  items[i].onclick = function() {
			    var selectedObj = {};
					selectedObj["selected"] = items[i].id;
					chrome.storage.sync.set(selectedObj);
			  }
			})(i);

			var delete_btns = document.getElementsByClassName('delete');
			for(var i=0; i<delete_btns.length; i++)(function(i){
				delete_btns[i].onclick = function() {
					var deleteName = delete_btns[i].id

					//if deleteName === Selected value, change Selected value to first object name

					chrome.storage.sync.remove(deleteName);
					loadList();
			  }
			})(i);

			document.getElementById('save').onclick = function() {
				var name = document.getElementById('name').value;
				var link = document.getElementById('link').value;
				if(name && link){
					//if storage is empty, create a new Selected object and add name as the value

					var obj = {};
					obj[name] = link;
					chrome.storage.sync.set(obj);
					loadList();
				};
			};

			document.getElementById('clear').onclick = function() {
				chrome.storage.sync.clear();
			};
	};

	loadList();