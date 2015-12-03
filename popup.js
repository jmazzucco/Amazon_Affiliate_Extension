window.onload = function() {
	function loadList() {
		chrome.storage.sync.get(null, function(items) {
	    var allKeys = Object.keys(items);

	   	for (var i = 0; i < allKeys.length; i++){
	   		var key = allKeys[i]

	   		document.getElementById('list').innerHTML = "";
	 	 		chrome.storage.sync.get(key, function(data){

	 	 			for (var property in data){
	 	 				var newLi = document.createElement("li");
	 	 				newLi.setAttribute("id", property);
	 	 				var br = document.createElement("br");
	 	 				var name = document.createTextNode("Name: " + property);
	 	 				var link = document.createTextNode("Link: " + data[property]);

	 	 				newLi.appendChild(name);
						document.getElementById('list').appendChild(newLi)

						var newLi = document.createElement("li");
						newLi.appendChild(link);
						document.getElementById('list').appendChild(newLi)
						document.getElementById('list').appendChild(br)
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