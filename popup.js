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
	 	 				newP.innerHTML = "<input type='radio' id='"+property+"'/><label for='"+property+"'>"+property+"</label>"
	 	 				document.getElementById('radio_list').appendChild(newP);


	 	 				//change "Test" to the value in "Checked" object
	 	 				if (document.getElementById(property).id === "Test"){
	 	 					document.getElementById(property).setAttribute("checked", "checked");
	 	 				};
	 	 		// 		var name = document.createTextNode(property);
	 	 		// 		newLi.setAttribute("id", property);
	 	 		// 		newLi.appendChild(name);
						// document.getElementById('list').appendChild(newLi)
					};
	 	 		});
	 	 	};
		});
	}

	loadList();

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