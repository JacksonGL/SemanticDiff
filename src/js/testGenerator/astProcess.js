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
// program fuzzer

// node
// this program
// first parameter: original source code locaiton
// second parameter: fuzzer name
// thir parameter: output source code locaiton
// node src/js/testGenerator/astProcess.js tests/tiny_tests/regexp.js dummy tests/tiny_tests/regexp-fuzzed.js

(function () {
	var path = require('path');
	var acorn = require('acorn');
	var escodegen = require('escodegen');
	var fs = require('fs');
	
	var inputPath = path.resolve(process.argv[2]);
	var fuzzerName = process.argv[3];
	var outputPath = path.resolve(process.argv[4]);

	console.log('getting code from: ' + inputPath);
	var code = fs.readFileSync(inputPath);
	var ast = acorn.parse(code);
	var fuzz;

	try{
		fuzz = require('./fuzzers/' + fuzzerName + '.js');
	} catch(e) {
		console.log('exception when loading: ' + fuzzerName);
		console.log(e);
	}
	console.log('fuzzing...');
	ast = fuzz(ast);
	var outputCode = escodegen.generate(ast);
	console.log('saving fuzzed code into: ' + outputPath);
	fs.writeFileSync(outputPath, outputCode);

})();