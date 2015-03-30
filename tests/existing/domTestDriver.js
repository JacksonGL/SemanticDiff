/*
 * Copyright 2015 University of California, Berkeley.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Author: Liang Gong

/*
	argv0: node
	argv1: this test driver script
	argv2: instrumented code
	argv3: test script for the instrumented code	
*/

var jsdom = require('jsdom');

try {
	jsdom.env({
		html: "<html><body></body></html>",
		scripts: [],
		done: function(errors, window2) {
			window = window2;
			require(process.argv[2]);
			require(process.argv[3]);
		}
	});
} catch (ex) {
	console.log(ex);
}