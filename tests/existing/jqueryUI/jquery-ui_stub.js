/*
 * Copyright (c) 2015, University of California, Berkeley
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// Author: Liang Gong (gongliang13@cs.berkeley.edu)

var jsdom = require("jsdom");
var fs = require('fs');

try {
	jsdom.env({
		html: fs.readFileSync('tests/existing/jqueryUI/index.html'),
		//scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.js',
		//	'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.js'
		//],
		features: {
			FetchExternalResources: ["script"],
			ProcessExternalResources: ["script"],
			SkipExternalResources: false,
			MutationEvents: '2.0'
		},
		loaded: function(err, window2) {
			if (err) {
				console.log(err);
			}
			// replicate all global variables
			window = window2;
			navigator = window.navigator;
			document = window.document;
			location = window.location;
			// [import script and test]

			// this is the test script of jQuery UI

			// test script start
			// [import script]
			jQuery = $ = window.$ = window.jQuery = require('./external/jquery/jquery.js');
			// console.log(window.$);			
			require('./jquery-ui.run.js');

			$("#accordion").accordion();
			var availableTags = [
				"ActionScript",
				"AppleScript",
				"Asp",
				"BASIC",
				"C",
				"C++",
				"Clojure",
				"COBOL",
				"ColdFusion",
				"Erlang",
				"Fortran",
				"Groovy",
				"Haskell",
				"Java",
				"JavaScript",
				"Lisp",
				"Perl",
				"PHP",
				"Python",
				"Ruby",
				"Scala",
				"Scheme"
			];
			$("#autocomplete").autocomplete({
				source: availableTags
			});
			$("#button").button();
			$("#radioset").buttonset();
			$("#tabs").tabs();
			$("#dialog").dialog({
				autoOpen: false,
				width: 400,
				buttons: [{
					text: "Ok",
					click: function() {
						$(this).dialog("close");
					}
				}, {
					text: "Cancel",
					click: function() {
						$(this).dialog("close");
					}
				}]
			});

			// Link to open the dialog
			$("#dialog-link").click(function(event) {
				$("#dialog").dialog("open");
				event.preventDefault();
			});

			$("#datepicker").datepicker({
				inline: true
			});
			$("#slider").slider({
				range: true,
				values: [17, 67]
			});
			$("#progressbar").progressbar({
				value: 20
			});
			$("#spinner").spinner();
			$("#menu").menu();
			$("#tooltip").tooltip();
			$("#selectmenu").selectmenu();

			// Hover states on the static widgets
			$("#dialog-link, #icons li").hover(
				function() {
					$(this).addClass("ui-state-hover");
				},
				function() {
					$(this).removeClass("ui-state-hover");
				}
			);
			console.log($('body')[0].innerHTML);
			// test script end
		}
	});
} catch (ex) {
	console.log(ex);
}