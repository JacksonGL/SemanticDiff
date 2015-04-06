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
// fuzzer that tries not to generate a program leading to a runtime exception


(function () {
	function fuzz(ast) {
		// randomly finds two statements or expression that 
		// has the same type and swap their locations

		var queue = [ast];
		var node;
		while (queue.length > 0) {
			node = queue.pop();
			for (var prop in node) {
				if (!node.hasOwnProperty(prop)) continue;

				if (Array.isArray(node[prop])) {
					for(var i=0;i<node[prop].length;i++) {
						if(typeof node[prop][i] === 'object') {
							queue.push(node[prop][i]);
						}
					}
				} else if(typeof node[prop] === 'object') {
					queue.push(node[prop]);
				}

				if(prop === 'body' && Array.isArray(node[prop])) {
					var array = node[prop];
					fuzzArray(array);
				}
			}
		}

		return ast;
	}

	function fuzzArray(array) {
		//console.log('fuzzing array');
		for(var i=0;i<array.length/3;i++) {
			var idx1 = (Math.random() * array.length)|0;
			var idx2 = (Math.random() * array.length)|0;
			if(idx1 === idx2) continue;
			var origIdx = Math.min(idx1, idx2);
			var destIdx = Math.max(idx1, idx2);
			insert(array, destIdx, array[origIdx]);
		}
	} 

	RegExp.prototype.toJSON = function() {
        var str = this.source;
        var glb = this.global;
        var ignoreCase = this.ignoreCase;
        var multiline = this.multiline;
        var obj = {
            type: 'J$.AST.REGEXP',
            value: str,
            glb : glb,
            ignoreCase: ignoreCase,
            multiline: multiline
        }
        return obj;
    }

    function JSONParseHandler(key, value) {
        var ret = value, flags = '';
        if (typeof value === 'object' && value && value.type === 'J$.AST.REGEXP') {
            if (value.glb) 
                flags += 'g';
            if (value.ignoreCase)
                flags += 'i';
            if (value.multiline)
                flags += 'm';
            ret = RegExp(value.value, flags);
        }
        return ret;
    }

    function clone(src) {
        return JSON.parse(JSON.stringify(src), JSONParseHandler);
    }

	function insert(array, index, item) {
		array.splice(index, 0, clone(item));
	}

	module.exports = fuzz;
})();