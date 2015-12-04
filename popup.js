	function loadList() {

		chrome.storage.sync.get(null, function(items) {
	    var allItems = items
	    var selectedItem = allItems["selected"];

		  if(allItems){
		  	document.getElementById('radio_list').innerHTML = "";

		   	for (var property in allItems){
	 				//add all stored object keys to radio list, expect for the "selected" object key
	 				if(!(property === "selected")) {
		 				var newP = document.createElement("p");
		 				newP.innerHTML = "<input type='radio' class='items' name='radio_items' id='"+property+"'/><label for='radio_items'>"+property+"</label>"
		 				document.getElementById('radio_list').appendChild(newP);

		 				//add Delete button next to each radio list item

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

			document.getElementById('save').onclick = function() {
				var name = document.getElementById('name').value;
				var link = document.getElementById('link').value;
				if(name && link){
					//if storage is empty, create a new Selected object and add name as the value
					var obj = {};
					obj[name] = link;
					chrome.storage.sync.set(obj);
					loadList()
				};
			};

			//add new function for deleting individual items from the list
				//when the last list item is deleted, remove the Selected object as well

			document.getElementById('clear').onclick = function() {
				chrome.storage.sync.clear();
			};
	};

	loadList();