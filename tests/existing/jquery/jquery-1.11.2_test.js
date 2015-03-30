
/*
	argv0: node
	argv1: this test driver script
	argv2: instrumented code
	argv3: test script for the instrumented code	
*/

/**/
var jsdom = require('jsdom');

try {
	jsdom.env({
		html: "<html><body></body></html>",
		scripts: [],
		done: function(errors, window2) {
			window = window2;
			console.log(process.argv);
			require(process.argv[2]);
			require(process.argv[3]);
			//var $ = require(process.cwd() + '/tests/existing/jquery/jquery-1.11.2_jalangi_.js');
			//$('body').append("<div class='testing'>Hello World</div>");
			//console.log($(".testing").text()); // outputs Hello World
		}
	});
} catch (ex) {
	console.log(ex);
}

/*
// Run some jQuery on a html fragment
var jsdom = require("jsdom");
var fs = require('fs');

console.log(jsdom);
jsdom.env({
	url: "http://news.ycombinator.com/",
	scripts: ["http://code.jquery.com/jquery.js"],
	done: function(errors, window) {
		var $ = window.$;
		console.log("HN Links");
		$("td.title:not(:last) a").each(function() {
			console.log(" -", $(this).text());
		});
	}
});

*/