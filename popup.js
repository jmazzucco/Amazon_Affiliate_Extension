window.onload = function() {
	function loadList() {
		chrome.storage.sync.get(null, function(items) {
	    var allKeys = Object.keys(items);

	   	for (var i = 0; i < allKeys.length; i++){
	   		var key = allKeys[i]
	   		document.getElementById('radio_list').innerHTML = "";
	 	 		chrome.storage.sync.get(key, function(data){

	 	 			for (var property in data){
	 	 				//data[property] <- portal link
	 	 				var newP = document.createElement("p");
	 	 				newP.innerHTML = "<input type='radio' class='items' name='radio_items' id='"+property+"'/><label for='radio_items'>"+property+"</label>"
	 	 				document.getElementById('radio_list').appendChild(newP);

	 	 				if (document.getElementById(property).id === "Test"){//Test is a place holder for the value found in the Selected object in storage
	 	 					document.getElementById(property).setAttribute("checked", "checked");
	 	 				};
					};
	 	 		});
	 	 	};
	 	 	listenForEvents()
		});
	};

	function listenForEvents(){
		function saveItems(){
			var radio_items = document.getElementById("Duncan");
				console.log(radio_items);
			}

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
};

