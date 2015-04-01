/*
 * Copyright 2014 Samsung Information Systems America, Inc.
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

// Author: Manu Sridharan
// Author: Koushik Sen
// Author: Liang Gong

/*jslint node: true */
/*global process */
/*global J$ */

var jsdom = require('jsdom');
var argparse = require('argparse');
var parser = new argparse.ArgumentParser({
    addHelp: true,
    description: "Command-line utility to perform Jalangi2's analysis"
});
parser.addArgument(['--analysis'], {
    help: "absolute path to analysis file to run",
    action: 'append'
});
parser.addArgument(['--testScript'], {
    help: "the test script for the instrumented code",
    action: 'append'
});
parser.addArgument(['--instruCode'], {
    help: "the instrumented code to be run in a virtual web page",
    action: 'append'
});
parser.addArgument(['--initParam'], {
    help: "initialization parameter for analysis, specified as key:value",
    action: 'append'
});
parser.addArgument(['script_and_args'], {
    help: "script to record and CLI arguments for that script",
    nargs: argparse.Const.REMAINDER
});
var args = parser.parseArgs();

function runAnalysis(initParam) {
    if (args.script_and_args.length === 0) {
        console.error("must provide script to record");
        process.exit(1);
    }
    // we shift here so we can use the rest of the array later when
    // hacking process.argv; see below
    var script = args.script_and_args.shift();

    var path = require('path');
    acorn = require("acorn");
    esotope = require("esotope");
    require('../../../../jalangi2/src/js/headers').headerSources.forEach(function(header) {
        require("../../../../jalangi2/" + header);
    });

    J$.initParams = initParam || {};
    if (args.analysis) {
        args.analysis.forEach(function(src) {
            require(path.resolve(src));
        });
    }

    function startProgram() {
        // get the location of the instrumented code
        var script;
        if (args.instruCode) {
            args.instruCode.forEach(function(src) {
                script = path.resolve(src);
            });
        }
        // get the location of the test script
        var testScript;
        if (args.testScript) {
            args.testScript.forEach(function(src) {
                testScript = path.resolve(src);
            });
        }

        // setup a virtual DOM
        try {
            jsdom.env({
                html: "<html><body></body></html>",
                scripts: [],
                done: function(errors, window2) {
                    if(errors) {
                        console.log(errors);
                    }
                    window = window2;
                    // import the instrumented code
                    globalObj = require(script);
                    // import the testing script
                    require(testScript);
                    // finally invoke the Jalangi callback
                    J$.endExecution();
                }
            });
        } catch (ex) {
            console.log(ex);
        }
    }

    if (J$.analysis && J$.analysis.onReady) {
        J$.analysis.onReady(startProgram);
    } else {
        startProgram();
    }
}

var initParam = null;
if (args.initParam) {
    initParam = {};
    args.initParam.forEach(function(keyVal) {
        var split = keyVal.split(':');
        if (split.length !== 2) {
            throw new Error("invalid initParam " + keyVal);
        }
        initParam[split[0]] = split[1];
    });
}
runAnalysis(initParam);