	function loadList() {

		chrome.storage.sync.get(null, function(items) {
	    var allKeys = Object.keys(items);
	    document.getElementById('radio_list').innerHTML = "";
	   	for (var property in items){
	 	 				//data[property] <- portal link
	 	 				var newP = document.createElement("p");
	 	 				newP.innerHTML = "<input type='radio' class='items' name='radio_items' id='"+property+"'/><label for='radio_items'>"+property+"</label>"
	 	 				document.getElementById('radio_list').appendChild(newP);

	 	 				if (document.getElementById(property).id === "Test"){//Test is a place holder for the value found in the Selected object in storage
	 	 					document.getElementById(property).setAttribute("checked", "checked");
	 	 				};
	   	};
	   	listenForEvents();
		});
	};


	function listenForEvents(){
			// var radio_items = document.getElementByClass(items);
			// console.log("radio_items");

			document.getElementById('save').onclick = function() {
				var name = document.getElementById('name').value;
				var link = document.getElementById('link').value;
				var obj = {};
				obj[name] = link;
				chrome.storage.sync.set(obj);
				loadList()
			};

			document.getElementById('clear').onclick = function() {
				chrome.storage.sync.clear();
			};
	};

	loadList();