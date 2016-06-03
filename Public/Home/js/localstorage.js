var LocalStorage = (function(){
	localStorage = window.localStorage;

	function isExist(name){
		var userData = localStorage.getItem(name);
		if (userData){
			return true;
		}else{
			return false;
		}
	}
	function getStorage(name){
		var userData = localStorage.getItem(name);
		if (userData){
			return $.parseJSON(userData);	
		}else{
			return false;
		}
	}
	function setStorage(name, obj){
		var data = JSON.stringify(obj);
		localStorage.setItem(name, data);
	}

	return {
		isExist: isExist,
		get: getStorage,
		set: setStorage
	};
})();

var UserStorage = (function(){
	var storage = window.localStorage;
	function getStorageName(alias){
		return (alias+'-user');
	}
	function isExist(alias){
		var name = getStorageName(alias);
		var userData = LocalStorage.isExist(name);
		return userData;
	}
	function getStorage(alias){
		var name = getStorageName(alias);
		var userData = LocalStorage.get(name);
	}
	function setStorage(alias, obj){
		var name = getStorageName(alias);
		LocalStorage.set(name, obj);
	}
	function uploadCloud(alias){
		var name = getStorageName(alias);
		var data = storage.getItem(name);
		$.post('{:U("Practice/updateUserData")}', 
			{
				bank: alias,
				data: data
			});
	}
	function downloadData(alias){
		var name = getStorageName(alias);
		$.post('{:U("Practice/loadUserData")}', {bank: name}, function(result){
			if (result.status == 0){
				LocalStorage.set(name, result.data);
			}
		}, json)
	}
	return {
		isExist: isExist,
		get: getStorage,
		set: setStorage,
		upload: uploadCloud,
		download: downloadData
	};
})();

var BankStorage = (function(){
	return {
		isExist: LocalStorage.isExist,
		get: LocalStorage.get,
		set: LocalStorage.set,
	};
})();