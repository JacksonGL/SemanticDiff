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

var jsdom = require('jsdom');
var fs = require('fs');
var qunit = require('qunit');

var testcaseList = [
      './unitTests/css.js',
      './unitTests/traversing.js',
      './unitTests/data.js',
      './unitTests/callbacks.js',
      './unitTests/deferred.js',
      './unitTests/dimensions.js',
      './unitTests/effects.js',
      './unitTests/manipulation.js',
      './unitTests/queue.js',
      './unitTests/selector.js',
      './unitTests/serialize.js',
      './unitTests/support.js'
]
// setup a virtual DOM
try {
    jsdom.env({
        html: fs.readFileSync('tests/existing/jquery/index.html'),
        done: function(errors, window2) {
            window = window2;
            document = window.document;

            // import the script to be tested
            jQuery = $ = window.$ = window.jQuery = require('./jquery-1.11.2.run.js');
            original$ = $;
            originaljQuery = jQuery;

            var testcase;
            for (var i = 0; i < testcaseList.length; i++) {
                console.log(testcaseList[i]);
                testcase = require(testcaseList[i]).testcase;
                console.log(testcase);
                try {
                    testcase();
                } catch (ex) {
                    console.log(ex)
                    console.log(ex.stack);
                }
            }
        }
    });
} catch (ex) {
    console.log(ex);
}
