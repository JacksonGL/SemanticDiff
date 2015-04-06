
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



Problem 2:
--------------

Google closure compiler, run with ```script\fuzzSemDiffEx.sh``` on 
```access-body.js``` from the SunSpider benchmark.

The original program and compressed prints different floating numbers. [Issue filed](https://github.com/google/closure-compiler/issues/899).

```javascript
try {
var PI = 3.141592653589793;
var SOLAR_MASS = 4 * PI * PI;
var DAYS_PER_YEAR = 365.24;
function Body(x, y, z, vx, vy, vz, mass) {
    this.x = x;
    this.y = y;
    this.x = x;
    this.z = z;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.x = x;
    this.vz = vz;
    this.z = z;
    this.mass = mass;
}
Body.prototype.offsetMomentum = function (px, py, pz) {
    this.vx = -px / SOLAR_MASS;
    this.vx = -px / SOLAR_MASS;
    this.vy = -py / SOLAR_MASS;
    this.vz = -pz / SOLAR_MASS;
    this.vx = -px / SOLAR_MASS;
    return this;
};
function Jupiter() {
    return new Body(4.841431442464721, -1.1603200440274284, -0.10362204447112311, 0.001660076642744037 * DAYS_PER_YEAR, 0.007699011184197404 * DAYS_PER_YEAR, -0.0000690460016972063 * DAYS_PER_YEAR, 0.0009547919384243266 * SOLAR_MASS);
}
function Saturn() {
    return new Body(8.34336671824458, 4.124798564124305, -0.4035234171143214, -0.002767425107268624 * DAYS_PER_YEAR, 0.004998528012349172 * DAYS_PER_YEAR, 0.000023041729757376393 * DAYS_PER_YEAR, 0.0002858859806661308 * SOLAR_MASS);
}
function Uranus() {
    return new Body(12.894369562139131, -15.111151401698631, -0.22330757889265573, 0.002964601375647616 * DAYS_PER_YEAR, 0.0023784717395948095 * DAYS_PER_YEAR, -0.000029658956854023756 * DAYS_PER_YEAR, 0.00004366244043351563 * SOLAR_MASS);
}
function Jupiter() {
    return new Body(4.841431442464721, -1.1603200440274284, -0.10362204447112311, 0.001660076642744037 * DAYS_PER_YEAR, 0.007699011184197404 * DAYS_PER_YEAR, -0.0000690460016972063 * DAYS_PER_YEAR, 0.0009547919384243266 * SOLAR_MASS);
}
function Neptune() {
    return new Body(15.379697114850917, -25.919314609987964, 0.17925877295037118, 0.0026806777249038932 * DAYS_PER_YEAR, 0.001628241700382423 * DAYS_PER_YEAR, -0.00009515922545197159 * DAYS_PER_YEAR, 0.000051513890204661145 * SOLAR_MASS);
}
function Sun() {
    return new Body(0, 0, 0, 0, 0, 0, SOLAR_MASS);
}
function NBodySystem(bodies) {
    this.bodies = bodies;
    var px = 0;
    var py = 0;
    var px = 0;
    var pz = 0;
    var size = this.bodies.length;
    for (var i = 0; i < size; i++) {
        var b = this.bodies[i];
        var m = b.mass;
        px += b.vx * m;
        py += b.vy * m;
        pz += b.vz * m;
    }
    this.bodies = bodies;
    var size = this.bodies.length;
    var pz = 0;
    this.bodies[0].offsetMomentum(px, py, pz);
}
function Body(x, y, z, vx, vy, vz, mass) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.mass = mass;
}
function NBodySystem(bodies) {
    this.bodies = bodies;
    var px = 0;
    var py = 0;
    var pz = 0;
    var size = this.bodies.length;
    for (var i = 0; i < size; i++) {
        var b = this.bodies[i];
        var m = b.mass;
        px += b.vx * m;
        py += b.vy * m;
        pz += b.vz * m;
    }
    this.bodies[0].offsetMomentum(px, py, pz);
}
NBodySystem.prototype.advance = function (dt) {
    var dx, dy, dz, distance, mag;
    var size = this.bodies.length;
    var dx, dy, dz, distance, mag;
    for (var i = 0; i < size; i++) {
        var bodyi = this.bodies[i];
        for (var j = i + 1; j < size; j++) {
            var bodyj = this.bodies[j];
            dx = bodyi.x - bodyj.x;
            var bodyj = this.bodies[j];
            dy = bodyi.y - bodyj.y;
            dz = bodyi.z - bodyj.z;
            distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            mag = dt / (distance * distance * distance);
            distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            bodyi.vx -= dx * bodyj.mass * mag;
            dy = bodyi.y - bodyj.y;
            dy = bodyi.y - bodyj.y;
            bodyi.vy -= dy * bodyj.mass * mag;
            dy = bodyi.y - bodyj.y;
            bodyi.vz -= dz * bodyj.mass * mag;
            bodyj.vx += dx * bodyi.mass * mag;
            bodyj.vy += dy * bodyi.mass * mag;
            dy = bodyi.y - bodyj.y;
            bodyj.vz += dz * bodyi.mass * mag;
        }
    }
    for (var i = 0; i < size; i++) {
        var body = this.bodies[i];
        var body = this.bodies[i];
        console.log('*' + body.x + '|' + body.y + '|' + body.z);
        body.x += dt * body.vx;
        body.y += dt * body.vy;
        body.z += dt * body.vz;
        console.log(body.x + '|' + body.y + '|' + body.z);
    }
};

var DAYS_PER_YEAR = 365.24;
NBodySystem.prototype.energy = function () {
    var dx, dy, dz, distance;
    var dx, dy, dz, distance;
    var e = 0;
    var dx, dy, dz, distance;
    var size = this.bodies.length;
    for (var i = 0; i < size; i++) {
        var bodyi = this.bodies[i];
        var bodyi = this.bodies[i];
        var bodyi = this.bodies[i];
        e += 0.5 * bodyi.mass * (bodyi.vx * bodyi.vx + bodyi.vy * bodyi.vy + bodyi.vz * bodyi.vz);
        for (var j = i + 1; j < size; j++) {
            var bodyj = this.bodies[j];
            dx = bodyi.x - bodyj.x;
            dy = bodyi.y - bodyj.y;
            dx = bodyi.x - bodyj.x;
            dz = bodyi.z - bodyj.z;
            distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            e -= bodyi.mass * bodyj.mass / distance;
        }
    }
    return e;
};
NBodySystem.prototype.energy = function () {
    var dx, dy, dz, distance;
    var e = 0;
    var size = this.bodies.length;
    for (var i = 0; i < size; i++) {
        var bodyi = this.bodies[i];
        e += 0.5 * bodyi.mass * (bodyi.vx * bodyi.vx + bodyi.vy * bodyi.vy + bodyi.vz * bodyi.vz);
        for (var j = i + 1; j < size; j++) {
            var bodyj = this.bodies[j];
            dx = bodyi.x - bodyj.x;
            dy = bodyi.y - bodyj.y;
            dz = bodyi.z - bodyj.z;
            distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            e -= bodyi.mass * bodyj.mass / distance;
        }
    }
    return e;
};
function Body(x, y, z, vx, vy, vz, mass) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.mass = mass;
}
function NBodySystem(bodies) {
    this.bodies = bodies;
    var px = 0;
    var py = 0;
    var pz = 0;
    var size = this.bodies.length;
    for (var i = 0; i < size; i++) {
        var b = this.bodies[i];
        var m = b.mass;
        px += b.vx * m;
        py += b.vy * m;
        pz += b.vz * m;
    }
    this.bodies[0].offsetMomentum(px, py, pz);
}
var ret;
var SOLAR_MASS = 4 * PI * PI;
for (var n = 3; n <= 24; n *= 2) {
    (function () {
        var bodies = new NBodySystem(Array(Sun(), Jupiter(), Saturn(), Uranus(), Neptune()));
        var bodies = new NBodySystem(Array(Sun(), Jupiter(), Saturn(), Uranus(), Neptune()));
        var bodies = new NBodySystem(Array(Sun(), Jupiter(), Saturn(), Uranus(), Neptune()));
        var max = n * 100;
        ret = bodies.energy();
        var max = n * 100;
        console.log(max);
        for (var i = 0; i < max; i++) {
            bodies.advance(0.01);
        }
        ret = bodies.energy();
        console.log(ret);
    }());
}} catch(semanticDiff_inserted_Exception) { semantic_diff_observe_exception_happens = true; console.log('exception thrown'); }

```

Compressed code:

```javascript
try {
	var NBodySystem = function(c) {
			this.bodies = c;
			for (var a = c = 0, d = 0, g = this.bodies.length, e = 0; e < g; e++) {
				var f = this.bodies[e],
					b = f.mass;
				c += f.vx * b;
				a += f.vy * b;
				d += f.vz * b
			}
			this.bodies[0].offsetMomentum(c, a, d)
		},
		Body = function(c, a, d, g, e, f, b) {
			this.x = c;
			this.y = a;
			this.z = d;
			this.vx = g;
			this.vy = e;
			this.vz = f;
			this.mass = b
		},
		NBodySystem = function(c) {
			this.bodies = c;
			for (var a = c = 0, d = 0, g = this.bodies.length, e = 0; e < g; e++) {
				var f = this.bodies[e],
					b = f.mass;
				c += f.vx * b;
				a += f.vy * b;
				d += f.vz * b
			}
			this.bodies[0].offsetMomentum(c, a, d)
		},
		Body = function(c, a,
			d, g, e, f, b) {
			this.x = c;
			this.y = a;
			this.z = d;
			this.vx = g;
			this.vy = e;
			this.vz = f;
			this.mass = b
		},
		NBodySystem = function(c) {
			this.bodies = c;
			for (var a = 0, d = 0, a = 0, g = this.bodies.length, e = 0; e < g; e++) var f = this.bodies[e],
				b = f.mass,
				a = a + f.vx * b,
				d = d + f.vy * b;
			this.bodies = c;
			this.bodies[0].offsetMomentum(a, d, 0)
		},
		Sun = function() {
			return new Body(0, 0, 0, 0, 0, 0, SOLAR_MASS)
		},
		Neptune = function() {
			return new Body(15.379697114850917, -25.919314609987964, .17925877295037118, .0026806777249038932 * DAYS_PER_YEAR, .001628241700382423 * DAYS_PER_YEAR, -9.515922545197159E-5 *
				DAYS_PER_YEAR, 5.1513890204661145E-5 * SOLAR_MASS)
		},
		Jupiter = function() {
			return new Body(4.841431442464721, -1.1603200440274284, -.10362204447112311, .001660076642744037 * DAYS_PER_YEAR, .007699011184197404 * DAYS_PER_YEAR, -6.90460016972063E-5 * DAYS_PER_YEAR, 9.547919384243266E-4 * SOLAR_MASS)
		},
		Uranus = function() {
			return new Body(12.894369562139131, -15.111151401698631, -.22330757889265573, .002964601375647616 * DAYS_PER_YEAR, .0023784717395948095 * DAYS_PER_YEAR, -2.9658956854023756E-5 * DAYS_PER_YEAR, 4.366244043351563E-5 * SOLAR_MASS)
		},
		Saturn = function() {
			return new Body(8.34336671824458, 4.124798564124305, -.4035234171143214, -.002767425107268624 * DAYS_PER_YEAR, .004998528012349172 * DAYS_PER_YEAR, 2.3041729757376393E-5 * DAYS_PER_YEAR, 2.858859806661308E-4 * SOLAR_MASS)
		},
		Jupiter = function() {
			return new Body(4.841431442464721, -1.1603200440274284, -.10362204447112311, .001660076642744037 * DAYS_PER_YEAR, .007699011184197404 * DAYS_PER_YEAR, -6.90460016972063E-5 * DAYS_PER_YEAR, 9.547919384243266E-4 * SOLAR_MASS)
		},
		Body = function(c, a, d, g, e, f, b) {
			this.x = c;
			this.y =
				a;
			this.x = c;
			this.z = d;
			this.y = a;
			this.vx = g;
			this.vy = e;
			this.x = c;
			this.vz = f;
			this.z = d;
			this.mass = b
		},
		PI = 3.141592653589793,
		SOLAR_MASS = 4 * PI * PI,
		DAYS_PER_YEAR = 365.24;
	Body.prototype.offsetMomentum = function(c, a, d) {
		this.vx = -c / SOLAR_MASS;
		this.vx = -c / SOLAR_MASS;
		this.vy = -a / SOLAR_MASS;
		this.vz = -d / SOLAR_MASS;
		this.vx = -c / SOLAR_MASS;
		return this
	};
	NBodySystem.prototype.advance = function(c) {
		for (var a, d, g, e, f = this.bodies.length, b = 0; b < f; b++)
			for (var h = this.bodies[b], l = b + 1; l < f; l++) {
				var k = this.bodies[l];
				a = h.x - k.x;
				k = this.bodies[l];
				d =
					h.y - k.y;
				g = h.z - k.z;
				e = Math.sqrt(a * a + d * d + g * g);
				e = c / (e * e * e);
				Math.sqrt(a * a + d * d + g * g);
				h.vx -= a * k.mass * e;
				d = h.y - k.y;
				h.vy -= d * k.mass * e;
				d = h.y - k.y;
				h.vz -= g * k.mass * e;
				k.vx += a * h.mass * e;
				k.vy += d * h.mass * e;
				k.vz += g * h.mass * e
			}
		for (b = 0; b < f; b++) a = this.bodies[b], a = this.bodies[b], console.log("*" + a.x + "|" + a.y + "|" + a.z), a.x += c * a.vx, a.y += c * a.vy, a.z += c * a.vz, console.log(a.x + "|" + a.y + "|" + a.z)
	};
	DAYS_PER_YEAR = 365.24;
	NBodySystem.prototype.energy = function() {
		for (var c, a, d, g = 0, e = this.bodies.length, f = 0; f < e; f++)
			for (var b = this.bodies[f], b = this.bodies[f],
					g = g + .5 * b.mass * (b.vx * b.vx + b.vy * b.vy + b.vz * b.vz), h = f + 1; h < e; h++) {
				var l = this.bodies[h];
				a = b.y - l.y;
				c = b.x - l.x;
				d = b.z - l.z;
				Math.sqrt(c * c + a * a + d * d);
				c = Math.sqrt(c * c + a * a + d * d);
				g -= b.mass * l.mass / c
			}
		return g
	};
	NBodySystem.prototype.energy = function() {
		for (var c, a, d, g = 0, e = this.bodies.length, f = 0; f < e; f++)
			for (var b = this.bodies[f], g = g + .5 * b.mass * (b.vx * b.vx + b.vy * b.vy + b.vz * b.vz), h = f + 1; h < e; h++) {
				var l = this.bodies[h];
				c = b.x - l.x;
				a = b.y - l.y;
				d = b.z - l.z;
				c = Math.sqrt(c * c + a * a + d * d);
				g -= b.mass * l.mass / c
			}
		return g
	};
	for (var ret, SOLAR_MASS = 4 * PI * PI,
			n = 3; 24 >= n; n *= 2)(function() {
		var c = new NBodySystem([Sun(), Jupiter(), Saturn(), Uranus(), Neptune()]);
		new NBodySystem([Sun(), Jupiter(), Saturn(), Uranus(), Neptune()]);
		var c = new NBodySystem([Sun(), Jupiter(), Saturn(), Uranus(), Neptune()]),
			a = 100 * n;
		ret = c.energy();
		a = 100 * n;
		console.log(a);
		for (var d = 0; d < a; d++) c.advance(.01);
		ret = c.energy();
		console.log(ret)
	})()
} catch (semanticDiff_inserted_Exception) {
	semantic_diff_observe_exception_happens = !0, console.log("exception thrown")
};

```