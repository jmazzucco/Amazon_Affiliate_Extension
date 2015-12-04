	function loadList() {

		chrome.storage.sync.get(null, function(items) {
	    var allItems = items
	    var selectedItem = allItems["selected"];

		  if(allItems){
		  	document.getElementById('radio_list').innerHTML = "";

		   	for (var property in allItems){
	 				//add all stored object keys to radio list, expect for the "selected" object key
	 				if(!(property === "selected")) {
		 				//data[property] <- portal link
		 				var newP = document.createElement("p");
		 				newP.innerHTML = "<input type='radio' class='items' name='radio_items' id='"+property+"'/><label for='radio_items'>"+property+"</label>"
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
			//check that loop doesn't run if items.length is 0
			var items = document.getElementsByClassName('items');
			for(var i=0; i<items.length; i++)(function(i){
			  items[i].onclick = function() {
			  	// console.log("click");
			    var selectedObj = {};
					selectedObj["selected"] = items[i].id;
					// console.log(selectedObj);
					chrome.storage.sync.set(selectedObj);
			  }
			})(i);

			document.getElementById('save').onclick = function() {
				var name = document.getElementById('name').value;
				var link = document.getElementById('link').value;
				if(name && link){
					var obj = {};
					obj[name] = link;
					chrome.storage.sync.set(obj);
					loadList()
				};
			};

			document.getElementById('clear').onclick = function() {
				chrome.storage.sync.clear();
			};
	};

	loadList();