// 1. populate HTML list with arrays saved in local storage when document is loaded

window.onload = function() {
	document.getElementById('save').onclick = function() {
		var name = document.getElementById('name').value;
		var link = document.getElementById('link').value;
		var obj = {};
		obj[name] = link;
		chrome.storage.sync.set(obj);
	};

	document.getElementById('get').onclick = function() {
			chrome.storage.sync.get(null, function(items) {
		    var allKeys = Object.keys(items);
		    // var myNode = document.getElementById("newData");
				// console.log(myNode.firstChild);
				// while (myNode.firstChild) {
    // 			myNode.removeChild(myNode.firstChild);
				// }

		   	for (var i = 0; i < allKeys.length; i++){
		   		var key = allKeys[i]
		   		document.getElementById('list').innerHTML = "";
	   	 		chrome.storage.sync.get(key, function(data){

	   	 			for (var property in data){
	   	 				var newLi = document.createElement("li");
	   	 				var txt = document.createTextNode(property + " " + data[property]);
	   	 				newLi.appendChild(txt);
							document.getElementById('list').appendChild(newLi
						)};


						// console.log(data)
					// Move this to an addElement function after you get it working

	   	 			//


	   	 		});
	   	 	};
			});
	};

	document.getElementById('clear').onclick = function() {
		chrome.storage.sync.clear();
	};
};