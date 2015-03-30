# SemanticDiff
A research project aimed at detecting inconsistency among semantic-preserving code transformations for JavaScript.


This repository currently has been tested on Mac OS.

### Install

To run SemanticDiff you need to install jalangi2 first.

### Install jalangi2
See the Jalangi2 Repository here:
https://github.com/Samsung/jalangi2

### Install some node.js packages:

```
npm install argparse
npm install esotope
npm install jsdom
```

### Run SemanticDiff on node.js

The last argument specifies the target JavaScript program to be analysed.
```
    node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js tests/tiny_tests/test1.js
```

### Use SemanticDiff to detect inconsistency on simple JS minimization:

The last argument specifies the target JavaScript program to be analysed.
```
./script/genTrace.sh
```

### Use of the Google Closure Compiler

```
java -jar thirdParty/closure/compiler.jar --compilation_level WHITESPACE_ONLY --js_output_file tests/tiny_tests/regexp_min.js tests/tiny_tests/regexp.js
```

### Useful Resources

Debugging JavaScript with SourceMap

  https://developer.chrome.com/devtools/docs/javascript-debugging


### Events to be observed by SemanticDiff

 * write to global variable
 * putField on objects accessable from global name space
 * console
 * ajax
 * alert
 * modify dom


### Things that could make minimization to go wrong

 * use of ```eval```
 * statement without semicolon at the end

Also need to handle the ```math.random``` function

