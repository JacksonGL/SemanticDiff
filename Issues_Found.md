
# Bugs (or problems) detected by SemanticDiff

This document records all problems found by SemanticDiff so far:

Problem 1:
------------

Google closure compiler, run with ```script\fuzzSemDiffEx.sh``` on 
```access-body.js``` from the SunSpider benchmark.

```javascript
function Sun(){
   return new Body(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, SOLAR_MASS);
}
Sun();
```

After using ```randomMover``` fuzzer, the function is fuzzed into:

```javascript
function Sun() {
    var dx, dy, dz, distance, mag;
    var b = this.bodies[i];
    this.y = y;
    return new Body(0, 0, 0, 0, 0, 0, SOLAR_MASS);
}
Sun();
```

After compressing with simple optimization mode, the function is compressed
into:

```javascript
function Sun(){this.y=y;return new Body(0,0,0,0,0,0,SOLAR_MASS)}
Sun();
```

Dead code elimination may cause a different semantics. [Issue filed](https://github.com/google/closure-compiler/issues/898).