# SemanticDiff
A research project aimed at detecting inconsistency among semantic-preserving code transformations for JavaScript.


This repository currently has been tested on Mac OS.

### Install

To run SemanticDiff you need to install jalangi2 first.

### Install jalangi2
See the Jalangi2 Repository here:
https://github.com/Samsung/jalangi2

### Run SemanticDiff on node.js

The last argument specifies the target JavaScript program to be analysed.
```
    node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js tests/tiny_tests/test1.js
```


### Events to be observed by SemanticDiff

 * write to global variable
 * putField on objects accessable from global name space
 * console
 * ajax
 * alert
 * modify dom