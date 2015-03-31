// Simple Javascript example

console.log('Loading a web page');
var page = require('webpage').create();
var url = 'http://phantomjs.org/';
page.open(url, function(status) {
	//Page is loaded!
	console.log('test');
	console.log(window.document);
	phantom.exit();
});