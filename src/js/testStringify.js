// test customized stringify function

(function () {
	var objBuffer = [];
	console.log(JSON.stringify(global, handler, 2))
	function handler(key, value) {
		if(typeof value === 'object' || typeof value === 'function') {
			for(var i=0;i<objBuffer.length;i++) {
				if(objBuffer[i] === value) {
					// circular
					return 'circular-' + i;
				}
			}
			objBuffer.push(value);
		}
		return value;
	}	
})();