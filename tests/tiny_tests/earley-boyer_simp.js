function sc_print_debug() {
	sc_print.apply(null, arguments)
}
var sc_JS_GLOBALS = this,
	__sc_LINE = -1,
	__sc_FILE = "";

function sc_alert() {
	var a = arguments.length,
		b = "",
		c;
	for (c = 0; c < a; c++) b += sc_toDisplayString(arguments[c]);
	return alert(b)
}

function sc_typeof(a) {
	return typeof a
}

function sc_error() {
	for (var a = [sc_jsstring2symbol("*error*")], b = 0; b < arguments.length; b++) a[b + 1] = arguments[b];
	throw a;
}

function sc_raise(a) {
	throw a;
}

function sc_withHandlerLambda(a, b) {
	try {
		return b()
	} catch (c) {
		if (c._internalException) throw c;
		return a(c)
	}
}
var sc_properties = {};

function sc_putpropBang(a, b, c) {
	var d = sc_properties[a];
	d || (d = {}, sc_properties[a] = d);
	d[b] = c
}

function sc_getprop(a, b) {
	var c = sc_properties[a];
	return c ? b in c ? c[b] : !1 : !1
}

function sc_rempropBang(a, b) {
	var c = sc_properties[a];
	c && delete c[b]
}

function sc_any2String(a) {
	return jsstring2string(sc_toDisplayString(a))
}

function sc_isEqv(a, b) {
	return a === b
}

function sc_isEq(a, b) {
	return a === b
}

function sc_isNumber(a) {
	return "number" === typeof a
}

function sc_isComplex(a) {
	return sc_isNumber(a)
}

function sc_isReal(a) {
	return sc_isNumber(a)
}

function sc_isRational(a) {
	return sc_isReal(a)
}

function sc_isInteger(a) {
	return parseInt(a) === a
}

function sc_isExact(a) {
	return !1
}

function sc_isInexact(a) {
	return !0
}

function sc_equal(a) {
	for (var b = 1; b < arguments.length; b++)
		if (a !== arguments[b]) return !1;
	return !0
}

function sc_less(a) {
	for (var b = 1; b < arguments.length; b++) {
		if (a >= arguments[b]) return !1;
		a = arguments[b]
	}
	return !0
}

function sc_greater(a, b) {
	for (var c = 1; c < arguments.length; c++) {
		if (a <= arguments[c]) return !1;
		a = arguments[c]
	}
	return !0
}

function sc_lessEqual(a, b) {
	for (var c = 1; c < arguments.length; c++) {
		if (a > arguments[c]) return !1;
		a = arguments[c]
	}
	return !0
}

function sc_greaterEqual(a, b) {
	for (var c = 1; c < arguments.length; c++) {
		if (a < arguments[c]) return !1;
		a = arguments[c]
	}
	return !0
}

function sc_isZero(a) {
	return 0 === a
}

function sc_isPositive(a) {
	return 0 < a
}

function sc_isNegative(a) {
	return 0 > a
}

function sc_isOdd(a) {
	return 1 === a % 2
}

function sc_isEven(a) {
	return 0 === a % 2
}
var sc_max = Math.max,
	sc_min = Math.min;

function sc_plus() {
	for (var a = 0, b = 0; b < arguments.length; b++) a += arguments[b];
	return a
}

function sc_multi() {
	for (var a = 1, b = 0; b < arguments.length; b++) a *= arguments[b];
	return a
}

function sc_minus(a) {
	if (1 === arguments.length) return -a;
	for (var b = a, c = 1; c < arguments.length; c++) b -= arguments[c];
	return b
}

function sc_div(a) {
	if (1 === arguments.length) return 1 / a;
	for (var b = a, c = 1; c < arguments.length; c++) b /= arguments[c];
	return b
}
var sc_abs = Math.abs;

function sc_quotient(a, b) {
	return parseInt(a / b)
}

function sc_remainder(a, b) {
	return a % b
}

function sc_modulo(a, b) {
	var c = a % b;
	return 0 > c * b ? c + b : c
}

function sc_euclid_gcd(a, b) {
	var c;
	if (0 === a) return b;
	if (0 === b) return a;
	0 > a && (a = -a);
	0 > b && (b = -b);
	b > a && (c = a, a = b, b = c);
	for (;;) {
		a %= b;
		if (0 === a) break;
		b %= a;
		if (0 === b) return a
	}
	return b
}

function sc_gcd() {
	for (var a = 0, b = 0; b < arguments.length; b++) a = sc_euclid_gcd(a, arguments[b]);
	return a
}

function sc_lcm() {
	for (var a = 1, b = 0; b < arguments.length; b++) var c = Math.round(arguments[b] / sc_euclid_gcd(arguments[b], a)),
		a = a * Math.abs(c);
	return a
}
var sc_floor = Math.floor,
	sc_ceiling = Math.ceil,
	sc_truncate = parseInt,
	sc_round = Math.round,
	sc_exp = Math.exp,
	sc_log = Math.log,
	sc_sin = Math.sin,
	sc_cos = Math.cos,
	sc_tan = Math.tan,
	sc_asin = Math.asin,
	sc_acos = Math.acos,
	sc_atan = Math.atan,
	sc_sqrt = Math.sqrt,
	sc_expt = Math.pow;

function sc_exact2inexact(a) {
	return a
}

function sc_inexact2exact(a) {
	return a
}

function sc_number2jsstring(a, b) {
	return b ? a.toString(b) : a.toString()
}

function sc_jsstring2number(a, b) {
	if ("" === a) return !1;
	if (b) {
		var c = parseInt(a, b);
		if (!c && 0 !== c) return !1;
		var d = "01234567890abcdefghijklmnopqrstuvwxyz".substring(0, b + 1);
		return (new RegExp("^[" + d + "]*$", "i")).test(a) ? c : !1
	}
	c = +a;
	if (!c && 0 !== c) return !1;
	d = a.charAt(0);
	return 0 === +d && "0" !== d ? !1 : c
}

function sc_not(a) {
	return !1 === a
}

function sc_isBoolean(a) {
	return !0 === a || !1 === a
}

function sc_Pair(a, b) {
	this.car = a;
	this.cdr = b
}
sc_Pair.prototype.toString = function() {
	return sc_toDisplayString(this)
};
sc_Pair.prototype.sc_toWriteOrDisplayString = function(a) {
	for (var b = this, c = "(";;)
		if (c += a(b.car), sc_isPair(b.cdr)) c += " ", b = b.cdr;
		else {
			null !== b.cdr && (c += " . " + a(b.cdr));
			break
		}
	return c + ")"
};
sc_Pair.prototype.sc_toDisplayString = function() {
	return this.sc_toWriteOrDisplayString(sc_toDisplayString)
};
sc_Pair.prototype.sc_toWriteString = function() {
	return this.sc_toWriteOrDisplayString(sc_toWriteString)
};

function sc_isPair(a) {
	return a instanceof sc_Pair
}

function sc_isPairEqual(a, b, c) {
	return c(a.car, b.car) && c(a.cdr, b.cdr)
}

function sc_cons(a, b) {
	return new sc_Pair(a, b)
}

function sc_consStar() {
	for (var a = arguments[arguments.length - 1], b = arguments.length - 2; 0 <= b; b--) a = new sc_Pair(arguments[b], a);
	return a
}

function sc_car(a) {
	return a.car
}

function sc_cdr(a) {
	return a.cdr
}

function sc_setCarBang(a, b) {
	a.car = b
}

function sc_setCdrBang(a, b) {
	a.cdr = b
}

function sc_caar(a) {
	return a.car.car
}

function sc_cadr(a) {
	return a.cdr.car
}

function sc_cdar(a) {
	return a.car.cdr
}

function sc_cddr(a) {
	return a.cdr.cdr
}

function sc_caaar(a) {
	return a.car.car.car
}

function sc_cadar(a) {
	return a.car.cdr.car
}

function sc_caadr(a) {
	return a.cdr.car.car
}

function sc_caddr(a) {
	return a.cdr.cdr.car
}

function sc_cdaar(a) {
	return a.car.car.cdr
}

function sc_cdadr(a) {
	return a.cdr.car.cdr
}

function sc_cddar(a) {
	return a.car.cdr.cdr
}

function sc_cdddr(a) {
	return a.cdr.cdr.cdr
}

function sc_caaaar(a) {
	return a.car.car.car.car
}

function sc_caadar(a) {
	return a.car.cdr.car.car
}

function sc_caaadr(a) {
	return a.cdr.car.car.car
}

function sc_caaddr(a) {
	return a.cdr.cdr.car.car
}

function sc_cdaaar(a) {
	return a.car.car.car.cdr
}

function sc_cdadar(a) {
	return a.car.cdr.car.cdr
}

function sc_cdaadr(a) {
	return a.cdr.car.car.cdr
}

function sc_cdaddr(a) {
	return a.cdr.cdr.car.cdr
}

function sc_cadaar(a) {
	return a.car.car.cdr.car
}

function sc_caddar(a) {
	return a.car.cdr.cdr.car
}

function sc_cadadr(a) {
	return a.cdr.car.cdr.car
}

function sc_cadddr(a) {
	return a.cdr.cdr.cdr.car
}

function sc_cddaar(a) {
	return a.car.car.cdr.cdr
}

function sc_cdddar(a) {
	return a.car.cdr.cdr.cdr
}

function sc_cddadr(a) {
	return a.cdr.car.cdr.cdr
}

function sc_cddddr(a) {
	return a.cdr.cdr.cdr.cdr
}

function sc_lastPair(a) {
	sc_isPair(a) || sc_error("sc_lastPair: pair expected");
	var b = a;
	for (a = a.cdr; sc_isPair(a);) b = a, a = b.cdr;
	return b
}

function sc_isNull(a) {
	return null === a
}

function sc_isList(a) {
	var b;
	for (b = a;;) {
		if (null === b || b instanceof sc_Pair && null === b.cdr) return !0;
		if (b instanceof sc_Pair && b.cdr instanceof sc_Pair) {
			if (b = b.cdr.cdr, a = a.cdr, b === a) return !1
		} else return !1
	}
}

function sc_list() {
	for (var a = null, b = arguments, c = b.length - 1; 0 <= c; c--) a = new sc_Pair(b[c], a);
	return a
}

function sc_iota(a, b) {
	var c = null;
	b || (b = 0);
	for (var d = a - 1; 0 <= d; d--) c = new sc_Pair(d + b, c);
	return c
}

function sc_makeList(a, b) {
	for (var c = null, d = 0; d < a; d++) c = new sc_Pair(b, c);
	return c
}

function sc_length(a) {
	for (var b = 0; null !== a;) b++, a = a.cdr;
	return b
}

function sc_remq(a, b) {
	for (var c = {
			cdr: null
		}, d = c; null !== b;) b.car !== a && (d.cdr = sc_cons(b.car, null), d = d.cdr), b = b.cdr;
	return c.cdr
}

function sc_remqBang(a, b) {
	for (var c = {
			cdr: null
		}, d = c, e = !0; null !== b;) b.car === a ? e = !0 : (e && (d.cdr = b, e = !1), d = b), b = b.cdr;
	d.cdr = null;
	return c.cdr
}

function sc_delete(a, b) {
	for (var c = {
			cdr: null
		}, d = c; null !== b;) sc_isEqual(b.car, a) || (d.cdr = sc_cons(b.car, null), d = d.cdr), b = b.cdr;
	return c.cdr
}

function sc_deleteBang(a, b) {
	for (var c = {
			cdr: null
		}, d = c, e = !0; null !== b;) sc_isEqual(b.car, a) ? e = !0 : (e && (d.cdr = b, e = !1), d = b), b = b.cdr;
	d.cdr = null;
	return c.cdr
}

function sc_reverseAppendBang(a, b) {
	for (var c = b; null !== a;) {
		var d = c,
			c = a;
		a = a.cdr;
		c.cdr = d
	}
	return c
}

function sc_dualAppend(a, b) {
	if (null === a) return b;
	if (null === b) return a;
	var c = sc_reverse(a);
	return sc_reverseAppendBang(c, b)
}

function sc_append() {
	if (0 === arguments.length) return null;
	for (var a = arguments[arguments.length - 1], b = arguments.length - 2; 0 <= b; b--) a = sc_dualAppend(arguments[b], a);
	return a
}

function sc_dualAppendBang(a, b) {
	if (null === a) return b;
	if (null === b) return a;
	for (var c = a; null !== c.cdr;) c = c.cdr;
	c.cdr = b;
	return a
}

function sc_appendBang() {
	for (var a = null, b = 0; b < arguments.length; b++) a = sc_dualAppendBang(a, arguments[b]);
	return a
}

function sc_reverse(a) {
	for (var b = null; null !== a;) b = sc_cons(a.car, b), a = a.cdr;
	return b
}

function sc_reverseBang(a) {
	return sc_reverseAppendBang(a, null)
}

function sc_listTail(a, b) {
	for (var c = a, d = 0; d < b; d++) c = c.cdr;
	return c
}

function sc_listRef(a, b) {
	return sc_listTail(a, b).car
}

function sc_memq(a, b) {
	for (; null !== b;) {
		if (b.car === a) return b;
		b = b.cdr
	}
	return !1
}

function sc_memv(a, b) {
	for (; null !== b;) {
		if (b.car === a) return b;
		b = b.cdr
	}
	return !1
}

function sc_member(a, b) {
	for (; null !== b;) {
		if (sc_isEqual(b.car, a)) return b;
		b = b.cdr
	}
	return !1
}

function sc_assq(a, b) {
	for (; null !== b;) {
		if (b.car.car === a) return b.car;
		b = b.cdr
	}
	return !1
}

function sc_assv(a, b) {
	for (; null !== b;) {
		if (b.car.car === a) return b.car;
		b = b.cdr
	}
	return !1
}

function sc_assoc(a, b) {
	for (; null !== b;) {
		if (sc_isEqual(b.car.car, a)) return b.car;
		b = b.cdr
	}
	return !1
}

function sc_isCharStringEqual(a, b) {
	return a.val === b.val
}

function sc_isCharStringLess(a, b) {
	return a.val < b.val
}

function sc_isCharStringGreater(a, b) {
	return a.val > b.val
}

function sc_isCharStringLessEqual(a, b) {
	return a.val <= b.val
}

function sc_isCharStringGreaterEqual(a, b) {
	return a.val >= b.val
}

function sc_isCharStringCIEqual(a, b) {
	return a.val.toLowerCase() === b.val.toLowerCase()
}

function sc_isCharStringCILess(a, b) {
	return a.val.toLowerCase() < b.val.toLowerCase()
}

function sc_isCharStringCIGreater(a, b) {
	return a.val.toLowerCase() > b.val.toLowerCase()
}

function sc_isCharStringCILessEqual(a, b) {
	return a.val.toLowerCase() <= b.val.toLowerCase()
}

function sc_isCharStringCIGreaterEqual(a, b) {
	return a.val.toLowerCase() >= b.val.toLowerCase()
}

function sc_Char(a) {
	var b = sc_Char.lazy[a];
	if (b) return b;
	this.val = a;
	sc_Char.lazy[a] = this
}
sc_Char.lazy = {};
sc_Char.char2readable = {
	"\x00": "#\\null",
	"\u0007": "#\\bell",
	"\b": "#\\backspace",
	"\t": "#\\tab",
	"\n": "#\\newline",
	"\f": "#\\page",
	"\r": "#\\return",
	"\u001b": "#\\escape",
	" ": "#\\space",
	"\u007f": "#\\delete",
	"\u0001": "#\\soh",
	"\u0002": "#\\stx",
	"\u0003": "#\\etx",
	"\u0004": "#\\eot",
	"\u0005": "#\\enq",
	"\u0006": "#\\ack",
	"\x0B": "#\\vt",
	"\u000e": "#\\so",
	"\u000f": "#\\si",
	"\u0010": "#\\dle",
	"\u0011": "#\\dc1",
	"\u0012": "#\\dc2",
	"\u0013": "#\\dc3",
	"\u0014": "#\\dc4",
	"\u0015": "#\\nak",
	"\u0016": "#\\syn",
	"\u0017": "#\\etb",
	"\u0018": "#\\can",
	"\u0019": "#\\em",
	"\u001a": "#\\sub",
	"\u001b": "#\\esc",
	"\u001c": "#\\fs",
	"\u001d": "#\\gs",
	"\u001e": "#\\rs",
	"\u001f": "#\\us"
};
sc_Char.readable2char = {
	"null": "\x00",
	bell: "\u0007",
	backspace: "\b",
	tab: "\t",
	newline: "\n",
	page: "\f",
	"return": "\r",
	escape: "\u001b",
	space: " ",
	"delete": "\x00",
	soh: "\u0001",
	stx: "\u0002",
	etx: "\u0003",
	eot: "\u0004",
	enq: "\u0005",
	ack: "\u0006",
	bel: "\u0007",
	bs: "\b",
	ht: "\t",
	nl: "\n",
	vt: "\x0B",
	np: "\f",
	cr: "\r",
	so: "\u000e",
	si: "\u000f",
	dle: "\u0010",
	dc1: "\u0011",
	dc2: "\u0012",
	dc3: "\u0013",
	dc4: "\u0014",
	nak: "\u0015",
	syn: "\u0016",
	etb: "\u0017",
	can: "\u0018",
	em: "\u0019",
	sub: "\u001a",
	esc: "\u001b",
	fs: "\u001c",
	gs: "\u001d",
	rs: "\u001e",
	us: "\u001f",
	sp: " ",
	del: "\u007f"
};
sc_Char.prototype.toString = function() {
	return this.val
};
sc_Char.prototype.sc_toWriteString = function() {
	var a = sc_Char.char2readable[this.val];
	return a ? a : "#\\" + this.val
};

function sc_isChar(a) {
	return a instanceof sc_Char
}
var sc_isCharEqual = sc_isCharStringEqual,
	sc_isCharLess = sc_isCharStringLess,
	sc_isCharGreater = sc_isCharStringGreater,
	sc_isCharLessEqual = sc_isCharStringLessEqual,
	sc_isCharGreaterEqual = sc_isCharStringGreaterEqual,
	sc_isCharCIEqual = sc_isCharStringCIEqual,
	sc_isCharCILess = sc_isCharStringCILess,
	sc_isCharCIGreater = sc_isCharStringCIGreater,
	sc_isCharCILessEqual = sc_isCharStringCILessEqual,
	sc_isCharCIGreaterEqual = sc_isCharStringCIGreaterEqual,
	SC_NUMBER_CLASS = "0123456789",
	SC_WHITESPACE_CLASS = " \r\n\t\f",
	SC_LOWER_CLASS =
	"abcdefghijklmnopqrstuvwxyz",
	SC_UPPER_CLASS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function sc_isCharOfClass(a, b) {
	return -1 != b.indexOf(a)
}

function sc_isCharAlphabetic(a) {
	return sc_isCharOfClass(a.val, SC_LOWER_CLASS) || sc_isCharOfClass(a.val, SC_UPPER_CLASS)
}

function sc_isCharNumeric(a) {
	return sc_isCharOfClass(a.val, SC_NUMBER_CLASS)
}

function sc_isCharWhitespace(a) {
	a = a.val;
	return " " === a || "\r" === a || "\n" === a || "\t" === a || "\f" === a
}

function sc_isCharUpperCase(a) {
	return sc_isCharOfClass(a.val, SC_UPPER_CLASS)
}

function sc_isCharLowerCase(a) {
	return sc_isCharOfClass(a.val, SC_LOWER_CLASS)
}

function sc_char2integer(a) {
	return a.val.charCodeAt(0)
}

function sc_integer2char(a) {
	return new sc_Char(String.fromCharCode(a))
}

function sc_charUpcase(a) {
	return new sc_Char(a.val.toUpperCase())
}

function sc_charDowncase(a) {
	return new sc_Char(a.val.toLowerCase())
}

function sc_makeJSStringOfLength(a, b) {
	var c;
	c = void 0 === b ? " " : b;
	for (var d = "", e = 1; a >= e;) a & e && (d = d.concat(c)), c = c.concat(c), e *= 2;
	return d
}

function sc_makejsString(a, b) {
	return sc_makeJSStringOfLength(a, b ? b.val : " ")
}

function sc_jsstring2list(a) {
	for (var b = null, c = a.length - 1; 0 <= c; c--) b = sc_cons(new sc_Char(a.charAt(c)), b);
	return b
}

function sc_list2jsstring(a) {
	for (var b = []; null !== a;) b.push(a.car.val), a = a.cdr;
	return "".concat.apply("", b)
}
var sc_Vector = Array;
sc_Vector.prototype.sc_toWriteOrDisplayString = function(a) {
	if (0 === this.length) return "#()";
	for (var b = "#(" + a(this[0]), c = 1; c < this.length; c++) b += " " + a(this[c]);
	return b + ")"
};
sc_Vector.prototype.sc_toDisplayString = function() {
	return this.sc_toWriteOrDisplayString(sc_toDisplayString)
};
sc_Vector.prototype.sc_toWriteString = function() {
	return this.sc_toWriteOrDisplayString(sc_toWriteString)
};

function sc_isVector(a) {
	return a instanceof sc_Vector
}

function sc_isVectorEqual(a, b, c) {
	if (a.length !== b.length) return !1;
	for (var d = 0; d < a.length; d++)
		if (!c(a[d], b[d])) return !1;
	return !0
}

function sc_makeVector(a, b) {
	var c = new sc_Vector(a);
	void 0 !== b && sc_vectorFillBang(c, b);
	return c
}

function sc_vector() {
	for (var a = new sc_Vector, b = 0; b < arguments.length; b++) a.push(arguments[b]);
	return a
}

function sc_vectorLength(a) {
	return a.length
}

function sc_vectorRef(a, b) {
	return a[b]
}

function sc_vectorSetBang(a, b, c) {
	a[b] = c
}

function sc_vector2list(a) {
	for (var b = null, c = a.length - 1; 0 <= c; c--) b = sc_cons(a[c], b);
	return b
}

function sc_list2vector(a) {
	for (var b = new sc_Vector; null !== a;) b.push(a.car), a = a.cdr;
	return b
}

function sc_vectorFillBang(a, b) {
	for (var c = 0; c < a.length; c++) a[c] = b
}

function sc_copyVector(a, b) {
	if (b <= a.length) return a.slice(0, b);
	var c = a.concat();
	c.length = b;
	return c
}

function sc_vectorCopy(a, b, c) {
	return a.slice(b, c)
}

function sc_vectorCopyBang(a, b, c, d, e) {
	d || (d = 0);
	e || (e = c.length);
	if (b <= d)
		for (var f = d; f < e; b++, f++) a[b] = c[f];
	else
		for (b = b + (e - d) - 1, f = e - 1; f >= d; b--, f--) a[b] = c[f];
	return a
}

function sc_isProcedure(a) {
	return "function" === typeof a
}

function sc_apply(a) {
	for (var b = [], c = 1; c < arguments.length - 1; c++) b.push(arguments[c]);
	for (c = arguments[arguments.length - 1]; null !== c;) b.push(c.car), c = c.cdr;
	return a.apply(null, b)
}

function sc_map(a, b) {
	if (void 0 === b) return null;
	for (var c = arguments.length - 1, d = Array(c), e = null; null !== b;) {
		for (var f = 0; f < c; f++) d[f] = arguments[f + 1].car, arguments[f + 1] = arguments[f + 1].cdr;
		e = sc_cons(a.apply(null, d), e)
	}
	return sc_reverseAppendBang(e, null)
}

function sc_mapBang(a, b) {
	if (void 0 === b) return null;
	for (var c = b, d = arguments.length - 1, e = Array(d); null !== b;) {
		for (var f = b, h = 0; h < d; h++) e[h] = arguments[h + 1].car, arguments[h + 1] = arguments[h + 1].cdr;
		f.car = a.apply(null, e)
	}
	return c
}

function sc_forEach(a, b) {
	if (void 0 !== b)
		for (var c = arguments.length - 1, d = Array(c); null !== b;) {
			for (var e = 0; e < c; e++) d[e] = arguments[e + 1].car, arguments[e + 1] = arguments[e + 1].cdr;
			a.apply(null, d)
		}
}

function sc_filter(a, b) {
	for (var c = {
			cdr: null
		}, d = c; null !== b;) !1 !== a(b.car) && (d.cdr = sc_cons(b.car, null), d = d.cdr), b = b.cdr;
	return c.cdr
}

function sc_filterBang(a, b) {
	for (var c = sc_cons("dummy", b), d = c, e = b; null !== e;) !1 !== a(e.car) && (d = d.cdr = e), e = e.cdr;
	d.cdr = null;
	return c.cdr
}

function sc_filterMap1(a, b) {
	for (var c = null; null !== b;) {
		var d = a(b.car);
		!1 !== d && (c = sc_cons(d, c));
		b = b.cdr
	}
	return sc_reverseAppendBang(c, null)
}

function sc_filterMap2(a, b, c) {
	for (var d = null; null !== b;) {
		var e = a(b.car, c.car);
		!1 !== e && (d = sc_cons(e, d));
		b = b.cdr;
		c = c.cdr
	}
	return sc_reverseAppendBang(d, null)
}

function sc_filterMap(a, b, c, d) {
	if (void 0 === c) return sc_filterMap1(a, b);
	if (void 0 === d) return sc_filterMap2(a, b, c);
	for (var e = arguments.length - 1, f = Array(e), h = null; null !== b;) {
		for (var g = 0; g < e; g++) f[g] = arguments[g + 1].car, arguments[g + 1] = arguments[g + 1].cdr;
		g = a.apply(null, f);
		!1 !== g && (h = sc_cons(g, h))
	}
	return sc_reverseAppendBang(h, null)
}

function sc_any(a, b) {
	for (; null !== b;) {
		var c = a(b.car);
		if (!1 !== c) return c;
		b = b.cdr
	}
	return !1
}

function sc_anyPred(a, b) {
	return !1 !== sc_any(a, b)
}

function sc_every(a, b) {
	for (var c = !0; null !== b;) {
		c = a(b.car);
		if (!1 === c) return !1;
		b = b.cdr
	}
	return c
}

function sc_everyPred(a, b) {
	return !1 !== sc_every(a, b) ? !0 : !1
}

function sc_force(a) {
	return a()
}

function sc_makePromise(a) {
	var b = !1,
		c = void 0;
	return function() {
		if (!b) {
			var d = a();
			b || (b = !0, c = d)
		}
		return c
	}
}

function sc_Values(a) {
	this.values = a
}

function sc_values() {
	return 1 === arguments.length ? arguments[0] : new sc_Values(arguments)
}

function sc_callWithValues(a, b) {
	var c = a();
	return c instanceof sc_Values ? b.apply(null, c.values) : b(c)
}

function sc_dynamicWind(a, b, c) {
	a();
	try {
		return b()
	} finally {
		c()
	}
}

function sc_Struct(a) {
	this.name = a
}
sc_Struct.prototype.sc_toDisplayString = function() {
	return "#<struct" + sc_hash(this) + ">"
};
sc_Struct.prototype.sc_toWriteString = sc_Struct.prototype.sc_toDisplayString;

function sc_makeStruct(a) {
	return new sc_Struct(a)
}

function sc_isStruct(a) {
	return a instanceof sc_Struct
}

function sc_isStructNamed(a, b) {
	return b instanceof sc_Struct && b.name === a
}

function sc_getStructField(a, b, c) {
	return a[c]
}

function sc_setStructFieldBang(a, b, c, d) {
	a[c] = d
}

function sc_bitNot(a) {
	return ~a
}

function sc_bitAnd(a, b) {
	return a & b
}

function sc_bitOr(a, b) {
	return a | b
}

function sc_bitXor(a, b) {
	return a ^ b
}

function sc_bitLsh(a, b) {
	return a << b
}

function sc_bitRsh(a, b) {
	return a >> b
}

function sc_bitUrsh(a, b) {
	return a >>> b
}

function sc_jsField(a, b) {
	return a[b]
}

function sc_setJsFieldBang(a, b, c) {
	return a[b] = c
}

function sc_deleteJsFieldBang(a, b) {
	delete a[b]
}

function sc_jsCall(a, b) {
	for (var c = [], d = 2; d < arguments.length; d++) c[d - 2] = arguments[d];
	return b.apply(a, c)
}

function sc_jsMethodCall(a, b) {
	for (var c = [], d = 2; d < arguments.length; d++) c[d - 2] = arguments[d];
	return a[b].apply(a, c)
}

function sc_jsNew(a) {
	var b;
	b = "new c(" + (1 < arguments.length ? "arguments[1]" : "");
	for (var c = 2; c < arguments.length; c++) b += ", arguments[" + c + "]";
	return eval(b + ")")
}

function sc_pregexp(a) {
	return new RegExp(sc_string2jsstring(a))
}

function sc_pregexpMatch(a, b) {
	var c = (a instanceof RegExp ? a : sc_pregexp(a)).exec(sc_string2jsstring(b));
	if (null == c) return !1;
	for (var d = null, e = c.length - 1; 0 <= e; e--) d = null !== c[e] ? sc_cons(sc_jsstring2string(c[e]), d) : sc_cons(!1, d);
	return d
}

function sc_pregexpReplace(a, b, c) {
	b = sc_string2jsstring(b);
	c = sc_string2jsstring(c);
	a = a instanceof RegExp ? a.global ? a : new RegExp(a.source) : new RegExp(sc_string2jsstring(a));
	return b.replace(a, c)
}

function sc_pregexpReplaceAll(a, b, c) {
	b = sc_string2jsstring(b);
	c = sc_string2jsstring(c);
	a = a instanceof RegExp ? a.global ? a : new RegExp(a.source, "g") : new RegExp(sc_string2jsstring(a), "g");
	return b.replace(a, c)
}

function sc_pregexpSplit(a, b) {
	var c = a instanceof RegExp ? a : new RegExp(sc_string2jsstring(a)),
		c = sc_string2jsstring(b).split(c);
	return null == c ? !1 : sc_vector2list(c)
}

function sc_random(a) {
	return Math.floor(Math.random() * a)
}

function sc_currentDate() {
	return new Date
}

function sc_Hashtable() {}
sc_Hashtable.prototype.toString = function() {
	return "#{%hashtable}"
};

function sc_HashtableElement(a, b) {
	this.key = a;
	this.val = b
}

function sc_makeHashtable() {
	return new sc_Hashtable
}

function sc_hashtablePutBang(a, b, c) {
	var d = sc_hash(b);
	a[d] = new sc_HashtableElement(b, c)
}

function sc_hashtableGet(a, b) {
	var c = sc_hash(b);
	return c in a ? a[c].val : !1
}

function sc_hashtableForEach(a, b) {
	for (var c in a) a[c] instanceof sc_HashtableElement && b(a[c].key, a[c].val)
}

function sc_hashtableContains(a, b) {
	return sc_hash(b) in a ? !0 : !1
}
var SC_HASH_COUNTER = 0;

function sc_hash(a) {
	return null === a ? "null" : void 0 === a ? "undefined" : !0 === a ? "true" : !1 === a ? "false" : "number" === typeof a ? "num-" + a : "string" === typeof a ? "jsstr-" + a : a.sc_getHash ? a.sc_getHash() : sc_counterHash.call(a)
}

function sc_counterHash() {
	this.sc_hash || (this.sc_hash = "hash-" + SC_HASH_COUNTER, SC_HASH_COUNTER++);
	return this.sc_hash
}

function sc_Trampoline(a, b) {
	this["__trampoline return__"] = !0;
	this.args = a;
	this.MAX_TAIL_CALLs = b
}
sc_Trampoline.prototype.restart = function() {
	for (var a = this;;)
		if (SC_TAIL_OBJECT.calls = a.MAX_TAIL_CALLs - 1, a = a.args.callee.apply(SC_TAIL_OBJECT, a.args), !(a instanceof sc_Trampoline)) return a
};

function sc_bindExitLambda(a) {
	var b = new sc_BindExitException,
		c = function(a) {
			b.res = a;
			throw b;
		};
	try {
		return a(c)
	} catch (d) {
		if (d === b) return d.res;
		throw d;
	}
}

function sc_BindExitException() {
	this._internalException = !0
}
var SC_SCM2JS_GLOBALS = {},
	SC_TAIL_OBJECT = {};
SC_SCM2JS_GLOBALS.TAIL_OBJECT = SC_TAIL_OBJECT;

function sc_EOF() {}
var SC_EOF_OBJECT = new sc_EOF;

function sc_Port() {}

function sc_InputPort() {}
sc_InputPort.prototype = new sc_Port;
sc_InputPort.prototype.peekChar = function() {
	"peeked" in this || (this.peeked = this.getNextChar());
	return this.peeked
};
sc_InputPort.prototype.readChar = function() {
	var a = this.peekChar();
	delete this.peeked;
	return a
};
sc_InputPort.prototype.isCharReady = function() {
	return !0
};
sc_InputPort.prototype.close = function() {};

function sc_ErrorInputPort() {}
sc_ErrorInputPort.prototype = new sc_InputPort;
sc_ErrorInputPort.prototype.getNextChar = function() {
	throw "can't read from error-port.";
};
sc_ErrorInputPort.prototype.isCharReady = function() {
	return !1
};

function sc_StringInputPort(a) {
	this.str = new String(a);
	this.pos = 0
}
sc_StringInputPort.prototype = new sc_InputPort;
sc_StringInputPort.prototype.getNextChar = function() {
	return this.pos >= this.str.length ? SC_EOF_OBJECT : this.str.charAt(this.pos++)
};

function sc_Token(a, b, c) {
	this.type = a;
	this.val = b;
	this.pos = c
}
sc_Token.EOF = 0;
sc_Token.OPEN_PAR = 1;
sc_Token.CLOSE_PAR = 2;
sc_Token.OPEN_BRACE = 3;
sc_Token.CLOSE_BRACE = 4;
sc_Token.OPEN_BRACKET = 5;
sc_Token.CLOSE_BRACKET = 6;
sc_Token.WHITESPACE = 7;
sc_Token.QUOTE = 8;
sc_Token.ID = 9;
sc_Token.DOT = 10;
sc_Token.STRING = 11;
sc_Token.NUMBER = 12;
sc_Token.ERROR = 13;
sc_Token.VECTOR_BEGIN = 14;
sc_Token.TRUE = 15;
sc_Token.FALSE = 16;
sc_Token.UNSPECIFIED = 17;
sc_Token.REFERENCE = 18;
sc_Token.STORE = 19;
sc_Token.CHAR = 20;
var SC_ID_CLASS = SC_LOWER_CLASS + SC_UPPER_CLASS + "!$%*+-./:<=>?@^_~";

function sc_Tokenizer(a) {
	this.port = a
}
sc_Tokenizer.prototype.peekToken = function() {
	if (this.peeked) return this.peeked;
	var a = this.nextToken();
	return this.peeked = a
};
sc_Tokenizer.prototype.readToken = function() {
	var a = this.peekToken();
	delete this.peeked;
	return a
};
sc_Tokenizer.prototype.nextToken = function() {
	function a(a) {
		return "0" <= a && "9" >= a
	}

	function b(a) {
		return -1 != SC_ID_CLASS.indexOf(a) || "0" <= a && "9" >= a
	}

	function c(a) {
		return " " === a || "\r" === a || "\n" === a || "\t" === a || "\f" === a
	}

	function d(a) {
		return c(a) || a === SC_EOF_OBJECT
	}

	function e() {
		for (res = "";;) {
			var a = g.readChar();
			switch (a) {
				case '"':
					return new sc_Token(11, res);
				case "\\":
					a = g.readChar();
					switch (a) {
						case "0":
							res += "\x00";
							break;
						case "a":
							res += "a";
							break;
						case "b":
							res += "\b";
							break;
						case "f":
							res += "\f";
							break;
						case "n":
							res += "\n";
							break;
						case "r":
							res += "\r";
							break;
						case "t":
							res += "\t";
							break;
						case "v":
							res += "\v";
							break;
						case '"':
							res += '"';
							break;
						case "\\":
							res += "\\";
							break;
						case "x":
							for (a = 0;;) {
								var b = g.peekChar();
								if ("0" <= b && "9" >= b) g.readChar(), a = 16 * a + b.charCodeAt(0) - 48;
								else if ("a" <= b && "f" >= b) g.readChar(), a = 16 * a + b.charCodeAt(0) - 97;
								else if ("A" <= b && "F" >= b) g.readChar(), a = 16 * a + b.charCodeAt(0) - 65;
								else {
									res += String.fromCharCode(a);
									break
								}
							}
							break;
						default:
							if (a === SC_EOF_OBJECT) return new sc_Token(13, "unclosed string-literal" + res);
							res += a
					}
					break;
				default:
					if (a ===
						SC_EOF_OBJECT) return new sc_Token(13, "unclosed string-literal" + res);
					res += a
			}
		}
	}

	function f(a) {
		for (; b(g.peekChar());) a += g.readChar();
		return isNaN(a) ? new sc_Token(9, a) : new sc_Token(12, a - 0)
	}

	function h() {
		var b = g.readChar();
		if (c(b)) return new sc_Token(13, "bad #-pattern0.");
		if (a(b)) {
			for (b -= 0; a(g.peekChar());) b = 10 * b + (g.readChar() - 0);
			switch (g.readChar()) {
				case "#":
					return new sc_Token(18, b);
				case "=":
					return new sc_Token(19, b);
				default:
					return new sc_Token(13, "bad #-pattern1." + b)
			}
		}
		if ("(" === b) return new sc_Token(14);
		if ("\\" === b) {
			for (b = ""; !d(g.peekChar());) b += g.readChar();
			switch (b.length) {
				case 0:
					return sc_isEOFObject(g.peekChar) ? new sc_Token(13, "bad #-pattern2.") : new sc_Token(20, g.readChar());
				case 1:
					return new sc_Token(20, b);
				default:
					var e = sc_Char.readable2char[b.toLowerCase()];
					return e ? new sc_Token(20, e) : new sc_Token(13, "unknown character description: #\\" + b)
			}
		}
		var f;
		switch (b) {
			case "t":
				e = new sc_Token(15, !0);
				f = "";
				break;
			case "f":
				e = new sc_Token(16, !1);
				f = "";
				break;
			case "u":
				e = new sc_Token(17, void 0);
				f = "nspecified";
				break;
			default:
				return new sc_Token(13, "bad #-pattern3: " + b)
		}
		for (;;)
			if (b = g.peekChar(), !d(b) && ")" !== b || "" != f) {
				if (c(b) || "" == f) return new sc_Token(13, "bad #-pattern4 " + b + " " + f);
				if (f.charAt(0) == b) g.readChar(), f = f.slice(1);
				else return new sc_Token(13, "bad #-pattern5")
			} else return e
	}
	var g = this.port;
	(function() {
		for (var a = !1; !a;) {
			for (a = !0; c(g.peekChar());) g.readChar();
			if (";" === g.peekChar())
				for (g.readChar(), a = !1; k = g.readChar(), k !== SC_EOF_OBJECT && "\n" !== k;);
		}
	})();
	var k = g.readChar();
	if (k === SC_EOF_OBJECT) return new sc_Token(0,
		k);
	switch (k) {
		case " ":
		case "\n":
		case "\t":
			return readWhitespace();
		case "(":
			return new sc_Token(1);
		case ")":
			return new sc_Token(2);
		case "{":
			return new sc_Token(3);
		case "}":
			return new sc_Token(4);
		case "[":
			return new sc_Token(5);
		case "]":
			return new sc_Token(6);
		case "'":
			return new sc_Token(8);
		case "#":
			return h();
		case ".":
			var m;
			m = c(g.peekChar()) ? new sc_Token(10) : f(".");
			return m;
		case '"':
			return e();
		default:
			if (b(k)) return f(k);
			throw "unexpected character: " + k;
	}
};

function sc_Reader(a) {
	this.tokenizer = a;
	this.backref = []
}
sc_Reader.prototype.read = function() {
	function a(a) {
		function b(a, c) {
			return 1 === a && 2 === c || 3 === a && 4 === c || 5 === a && 6 === c
		}
		for (var c = null;;) {
			var d = e.peekToken();
			switch (d.type) {
				case 2:
				case 4:
				case 6:
					if (b(a, d.type)) return e.readToken(), sc_reverseBang(c);
					throw "closing par doesn't match: " + a + " " + listEndType;
				case 0:
					throw "unexpected end of file";
				case 10:
					e.readToken();
					var d = this.read(),
						f = e.readToken();
					if (b(a, f.type)) return sc_reverseAppendBang(c, d);
					throw "closing par doesn't match: " + a + " " + f.type;
				default:
					c = sc_cons(this.read(),
						c)
			}
		}
	}

	function b() {
		for (var a = [];;) switch (e.peekToken().type) {
			case 2:
				return e.readToken(), a;
			default:
				a.push(this.read())
		}
	}

	function c(a) {
		var b = this.read();
		return this.backref[a] = b
	}

	function d(a) {
		if (a in this.backref) return this.backref[a];
		throw "bad reference: " + a;
	}
	var e = this.tokenizer,
		f = e.readToken();
	if (13 === f.type) throw f.val;
	switch (f.type) {
		case 1:
		case 3:
		case 5:
			return a.call(this, f.type);
		case 8:
			return sc_cons("quote", sc_cons(this.read(), null));
		case 11:
			return sc_jsstring2string(f.val);
		case 20:
			return new sc_Char(f.val);
		case 14:
			return b.call(this);
		case 18:
			return d.call(this, f.val);
		case 19:
			return c.call(this, f.val);
		case 9:
			return sc_jsstring2symbol(f.val);
		case 0:
		case 12:
		case 15:
		case 16:
		case 17:
			return f.val;
		default:
			throw "unexpected token " + f.type + " " + f.val;
	}
};

function sc_read(a) {
	void 0 === a && (a = SC_DEFAULT_IN);
	return (new sc_Reader(new sc_Tokenizer(a))).read()
}

function sc_readChar(a) {
	void 0 === a && (a = SC_DEFAULT_IN);
	a = a.readChar();
	return a === SC_EOF_OBJECT ? a : new sc_Char(a)
}

function sc_peekChar(a) {
	void 0 === a && (a = SC_DEFAULT_IN);
	a = a.peekChar();
	return a === SC_EOF_OBJECT ? a : new sc_Char(a)
}

function sc_isCharReady(a) {
	void 0 === a && (a = SC_DEFAULT_IN);
	return a.isCharReady()
}

function sc_closeInputPort(a) {
	return a.close()
}

function sc_isInputPort(a) {
	return a instanceof sc_InputPort
}

function sc_isEOFObject(a) {
	return a === SC_EOF_OBJECT
}

function sc_currentInputPort() {
	return SC_DEFAULT_IN
}

function sc_callWithInputFile(a, b) {
	throw "can't open " + a;
}

function sc_callWithOutputFile(a, b) {
	throw "can't open " + a;
}

function sc_withInputFromFile(a, b) {
	throw "can't open " + a;
}

function sc_withOutputToFile(a, b) {
	throw "can't open " + a;
}

function sc_openInputFile(a) {
	throw "can't open " + a;
}

function sc_openOutputFile(a) {
	throw "can't open " + a;
}

function sc_basename(a) {
	var b = a.lastIndexOf("/");
	return 0 <= b ? a.substring(b + 1, a.length) : ""
}

function sc_dirname(a) {
	var b = a.lastIndexOf("/");
	return 0 <= b ? a.substring(0, b) : ""
}

function sc_withInputFromPort(a, b) {
	try {
		var c = SC_DEFAULT_IN;
		SC_DEFAULT_IN = a;
		return b()
	} finally {
		SC_DEFAULT_IN = c
	}
}

function sc_withInputFromString(a, b) {
	return sc_withInputFromPort(new sc_StringInputPort(sc_string2jsstring(a)), b)
}

function sc_withOutputToPort(a, b) {
	try {
		var c = SC_DEFAULT_OUT;
		SC_DEFAULT_OUT = a;
		return b()
	} finally {
		SC_DEFAULT_OUT = c
	}
}

function sc_withOutputToString(a) {
	var b = new sc_StringOutputPort;
	sc_withOutputToPort(b, a);
	return b.close()
}

function sc_withOutputToProcedure(a, b) {
	return sc_withOutputToPort(new sc_GenericOutputPort(function(b) {
		a(sc_jsstring2string(b))
	}), b)
}

function sc_openOutputString() {
	return new sc_StringOutputPort
}

function sc_openInputString(a) {
	return new sc_StringInputPort(sc_string2jsstring(a))
}

function sc_OutputPort() {}
sc_OutputPort.prototype = new sc_Port;
sc_OutputPort.prototype.appendJSString = function(a) {};
sc_OutputPort.prototype.close = function() {};

function sc_StringOutputPort() {
	this.res = ""
}
sc_StringOutputPort.prototype = new sc_OutputPort;
sc_StringOutputPort.prototype.appendJSString = function(a) {
	this.res += a
};
sc_StringOutputPort.prototype.close = function() {
	return sc_jsstring2string(this.res)
};

function sc_getOutputString(a) {
	return sc_jsstring2string(a.res)
}

function sc_ErrorOutputPort() {}
sc_ErrorOutputPort.prototype = new sc_OutputPort;
sc_ErrorOutputPort.prototype.appendJSString = function(a) {
	throw "don't write on ErrorPort!";
};
sc_ErrorOutputPort.prototype.close = function() {};

function sc_GenericOutputPort(a, b) {
	this.appendJSString = a;
	b && (this.close = b)
}
sc_GenericOutputPort.prototype = new sc_OutputPort;

function sc_isOutputPort(a) {
	return a instanceof sc_OutputPort
}

function sc_closeOutputPort(a) {
	return a.close()
}

function sc_write(a, b) {
	void 0 === b && (b = SC_DEFAULT_OUT);
	b.appendJSString(sc_toWriteString(a))
}

function sc_toWriteString(a) {
	return null === a ? "()" : !0 === a ? "#t" : !1 === a ? "#f" : void 0 === a ? "#unspecified" : "function" === typeof a ? "#<procedure " + sc_hash(a) + ">" : a.sc_toWriteString ? a.sc_toWriteString() : a.toString()
}

function sc_escapeWriteString(a) {
	var b = "",
		c = 0;
	for (i = 0; i < a.length; i++) switch (a.charAt(i)) {
		case "\x00":
			b += a.substring(c, i) + "\\0";
			c = i + 1;
			break;
		case "\b":
			b += a.substring(c, i) + "\\b";
			c = i + 1;
			break;
		case "\f":
			b += a.substring(c, i) + "\\f";
			c = i + 1;
			break;
		case "\n":
			b += a.substring(c, i) + "\\n";
			c = i + 1;
			break;
		case "\r":
			b += a.substring(c, i) + "\\r";
			c = i + 1;
			break;
		case "\t":
			b += a.substring(c, i) + "\\t";
			c = i + 1;
			break;
		case "\v":
			b += a.substring(c, i) + "\\v";
			c = i + 1;
			break;
		case '"':
			b += a.substring(c, i) + '\\"';
			c = i + 1;
			break;
		case "\\":
			b += a.substring(c,
				i) + "\\\\";
			c = i + 1;
			break;
		default:
			var d = a.charAt(i);
			if ("\v" !== "v" && "\v" == d) {
				b += a.substring(c, i) + "\\v";
				c = i + 1;
				continue
			}
			" " > a.charAt(i) && (b += a.substring(c, i) + "\\x" + a.charCodeAt(i).toString(16), c = i + 1)
	}
	return b += a.substring(c, i)
}

function sc_display(a, b) {
	void 0 === b && (b = SC_DEFAULT_OUT);
	b.appendJSString(sc_toDisplayString(a))
}

function sc_toDisplayString(a) {
	return null === a ? "()" : !0 === a ? "#t" : !1 === a ? "#f" : void 0 === a ? "#unspecified" : "function" === typeof a ? "#<procedure " + sc_hash(a) + ">" : a.sc_toDisplayString ? a.sc_toDisplayString() : a.toString()
}

function sc_newline(a) {
	void 0 === a && (a = SC_DEFAULT_OUT);
	a.appendJSString("\n")
}

function sc_writeChar(a, b) {
	void 0 === b && (b = SC_DEFAULT_OUT);
	b.appendJSString(a.val)
}

function sc_writeCircle(a, b) {
	void 0 === b && (b = SC_DEFAULT_OUT);
	b.appendJSString(sc_toWriteCircleString(a))
}

function sc_toWriteCircleString(a) {
	var b = sc_gensym("writeCircle");
	sc_prepWriteCircle(a, b, {
		nb: 0
	});
	return sc_genToWriteCircleString(a, b)
}

function sc_prepWriteCircle(a, b, c) {
	if (a instanceof sc_Pair || a instanceof sc_Vector)
		if (void 0 !== a[b]) a[b] ++, a[b + "nb"] || (a[b + "nb"] = c.nb++);
		else if (a[b] = 0, a instanceof sc_Pair) sc_prepWriteCircle(a.car, b, c), sc_prepWriteCircle(a.cdr, b, c);
	else
		for (var d = 0; d < a.length; d++) sc_prepWriteCircle(a[d], b, c)
}

function sc_genToWriteCircleString(a, b) {
	return a instanceof sc_Pair || a instanceof sc_Vector ? a.sc_toWriteCircleString(b) : sc_toWriteString(a)
}
sc_Pair.prototype.sc_toWriteCircleString = function(a, b) {
	if (this[a + "use"]) {
		var c = this[a + "nb"];
		0 === this[a] -- && (delete this[a], delete this[a + "nb"], delete this[a + "use"]);
		return b ? ". #" + c + "#" : "#" + c + "#"
	}
	0 === this[a] -- && (delete this[a], delete this[a + "nb"], delete this[a + "use"]);
	c = "";
	void 0 !== this[a] && (this[a + "use"] = !0, c = b ? c + (". #" + this[a + "nb"] + "=") : c + ("#" + this[a + "nb"] + "="), b = !1);
	b || (c += "(");
	c += sc_genToWriteCircleString(this.car, a);
	sc_isPair(this.cdr) ? c += " " + this.cdr.sc_toWriteCircleString(a, !0) : null !== this.cdr &&
		(c += " . " + sc_genToWriteCircleString(this.cdr, a));
	b || (c += ")");
	return c
};
sc_Vector.prototype.sc_toWriteCircleString = function(a) {
	if (this[a + "use"]) {
		var b = this[a + "nb"];
		0 === this[a] -- && (delete this[a], delete this[a + "nb"], delete this[a + "use"]);
		return "#" + b + "#"
	}
	0 === this[a] -- && (delete this[a], delete this[a + "nb"], delete this[a + "use"]);
	b = "";
	void 0 !== this[a] && (this[a + "use"] = !0, b += "#" + this[a + "nb"] + "=");
	for (var b = b + "#(", c = 0; c < this.length; c++) b += sc_genToWriteCircleString(this[c], a), c < this.length - 1 && (b += " ");
	return b + ")"
};

function sc_print(a) {
	if (1 === arguments.length) sc_display(a);
	else
		for (var b = 0; b < arguments.length; b++) sc_display(arguments[b]);
	sc_newline()
}

function sc_format(a, b) {
	for (var c = a.length, d = new sc_StringOutputPort, e = 0, f = 1; e < c;) {
		var h = a.indexOf("~", e);
		if (-1 == h) {
			d.appendJSString(a.substring(e, c));
			break
		} else {
			if (h > e)
				if (h == c - 1) {
					d.appendJSString(a.substring(e, c));
					break
				} else d.appendJSString(a.substring(e, h)), e = h;
			switch (a.charCodeAt(h + 1)) {
				case 65:
				case 97:
					sc_display(arguments[f], d);
					e += 2;
					f++;
					break;
				case 83:
				case 115:
					sc_write(arguments[f], d);
					e += 2;
					f++;
					break;
				case 86:
				case 118:
					sc_display(arguments[f], d);
					d.appendJSString("\n");
					e += 2;
					f++;
					break;
				case 67:
				case 99:
					d.appendJSString(String.fromCharCode(arguments[f]));
					e += 2;
					f++;
					break;
				case 88:
				case 120:
					d.appendJSString(arguments[f].toString(6));
					e += 2;
					f++;
					break;
				case 79:
				case 111:
					d.appendJSString(arguments[f].toString(8));
					e += 2;
					f++;
					break;
				case 66:
				case 98:
					d.appendJSString(arguments[f].toString(2));
					e += 2;
					f++;
					break;
				case 37:
				case 110:
					d.appendJSString("\n");
					e += 2;
					break;
				case 114:
					d.appendJSString("\r");
					e += 2;
					break;
				case 126:
					d.appendJSString("~");
					e += 2;
					break;
				default:
					return sc_error("format: illegal ~" + String.fromCharCode(a.charCodeAt(h + 1)) + " sequence"), ""
			}
		}
	}
	return d.close()
}
var SC_DEFAULT_IN = new sc_ErrorInputPort,
	SC_DEFAULT_OUT = new sc_ErrorOutputPort,
	SC_ERROR_OUT = new sc_ErrorOutputPort,
	sc_SYMBOL_PREFIX = "\u1e9c",
	sc_KEYWORD_PREFIX = "\u1e9d";

function sc_jsstring2string(a) {
	return a
}

function sc_jsstring2symbol(a) {
	return sc_SYMBOL_PREFIX + a
}

function sc_string2jsstring(a) {
	return a
}

function sc_symbol2jsstring(a) {
	return a.slice(1)
}

function sc_keyword2jsstring(a) {
	return a.slice(1)
}

function sc_jsstring2keyword(a) {
	return sc_KEYWORD_PREFIX + a
}

function sc_isKeyword(a) {
	return "string" === typeof a && a.charAt(0) === sc_KEYWORD_PREFIX
}
var sc_gensym = function() {
	var a = 1E3;
	return function(b) {
		a++;
		b || (b = sc_SYMBOL_PREFIX);
		return b + "s" + a + "~^sC-GeNsYm "
	}
}();

function sc_isEqual(a, b) {
	return a === b || sc_isPair(a) && sc_isPair(b) && sc_isPairEqual(a, b, sc_isEqual) || sc_isVector(a) && sc_isVector(b) && sc_isVectorEqual(a, b, sc_isEqual)
}

function sc_number2symbol(a, b) {
	return sc_SYMBOL_PREFIX + sc_number2jsstring(a, b)
}
var sc_number2string = sc_number2jsstring;

function sc_symbol2number(a, b) {
	return sc_jsstring2number(a.slice(1), b)
}
var sc_string2number = sc_jsstring2number;

function sc_string2integer(a, b) {
	return b ? parseInt(a, b) : +a
}

function sc_string2real(a) {
	return +a
}

function sc_isSymbol(a) {
	return "string" === typeof a && a.charAt(0) === sc_SYMBOL_PREFIX
}

function sc_symbol2string(a) {
	return a.slice(1)
}

function sc_string2symbol(a) {
	return sc_SYMBOL_PREFIX + a
}

function sc_symbolAppend() {
	for (var a = sc_SYMBOL_PREFIX, b = 0; b < arguments.length; b++) a += arguments[b].slice(1);
	return a
}

function sc_char2string(a) {
	return a.val
}

function sc_char2symbol(a) {
	return sc_SYMBOL_PREFIX + a.val
}

function sc_isString(a) {
	return "string" === typeof a && a.charAt(0) !== sc_SYMBOL_PREFIX
}
var sc_makeString = sc_makejsString;

function sc_string() {
	for (var a = 0; a < arguments.length; a++) arguments[a] = arguments[a].val;
	return "".concat.apply("", arguments)
}

function sc_stringLength(a) {
	return a.length
}

function sc_stringRef(a, b) {
	return new sc_Char(a.charAt(b))
}

function sc_isStringEqual(a, b) {
	return a === b
}

function sc_isStringLess(a, b) {
	return a < b
}

function sc_isStringGreater(a, b) {
	return a > b
}

function sc_isStringLessEqual(a, b) {
	return a <= b
}

function sc_isStringGreaterEqual(a, b) {
	return a >= b
}

function sc_isStringCIEqual(a, b) {
	return a.toLowerCase() === b.toLowerCase()
}

function sc_isStringCILess(a, b) {
	return a.toLowerCase() < b.toLowerCase()
}

function sc_isStringCIGreater(a, b) {
	return a.toLowerCase() > b.toLowerCase()
}

function sc_isStringCILessEqual(a, b) {
	return a.toLowerCase() <= b.toLowerCase()
}

function sc_isStringCIGreaterEqual(a, b) {
	return a.toLowerCase() >= b.toLowerCase()
}

function sc_substring(a, b, c) {
	return a.substring(b, c)
}

function sc_isSubstring_at(a, b, c) {
	return b == a.substring(c, c + b.length)
}

function sc_stringAppend() {
	return "".concat.apply("", arguments)
}
var sc_string2list = sc_jsstring2list,
	sc_list2string = sc_list2jsstring;

function sc_stringCopy(a) {
	return a
}

function sc_keyword2string(a) {
	return a.slice(1)
}

function sc_string2keyword(a) {
	return sc_KEYWORD_PREFIX + a
}
String.prototype.sc_toDisplayString = function() {
	return this.charAt(0) === sc_SYMBOL_PREFIX ? this.slice(1) : this.charAt(0) === sc_KEYWORD_PREFIX ? ":" + this.slice(1) : this.toString()
};
String.prototype.sc_toWriteString = function() {
	return this.charAt(0) === sc_SYMBOL_PREFIX ? this.slice(1) : this.charAt(0) === sc_KEYWORD_PREFIX ? ":" + this.slice(1) : '"' + sc_escapeWriteString(this) + '"'
};
var BgL_testzd2boyerzd2, BgL_nboyerzd2benchmarkzd2, BgL_setupzd2boyerzd2, translate_term_nboyer, translate_args_nboyer, untranslate_term_nboyer, BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer, BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer, translate_alist_nboyer, apply_subst_nboyer, apply_subst_lst_nboyer, tautologyp_nboyer, if_constructor_nboyer, rewrite_count_nboyer, rewrite_nboyer, rewrite_args_nboyer, unify_subst_nboyer, one_way_unify1_nboyer, false_term_nboyer, true_term_nboyer, trans_of_implies1_nboyer, is_term_equal_nboyer,
	is_term_member_nboyer, const_nboyer, sc_const_3_nboyer, sc_const_4_nboyer;
sc_const_4_nboyer = new sc_Pair("\u1e9cimplies", new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cu", null))), new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cu", new sc_Pair("\u1e9cw",
	null))), null))), null))), null))), new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cw", null))), null)));
sc_const_3_nboyer = sc_list(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ccompile", new sc_Pair("\u1e9cform", null)), new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair(new sc_Pair("\u1e9ccodegen", new sc_Pair(new sc_Pair("\u1e9coptimize", new sc_Pair("\u1e9cform", null)), new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ceqp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cfix",
		new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cy", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgreaterp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clesseqp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp",
		new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgreatereqp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cboolean", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx",
		new sc_Pair(new sc_Pair("\u1e9ct", null), null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cf", null), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ciff", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))),
		null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ceven1", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9ct", null), new sc_Pair(new sc_Pair("\u1e9codd", new sc_Pair(new sc_Pair("\u1e9csub1", new sc_Pair("\u1e9cx", null)), null)), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ccountps-", new sc_Pair("\u1e9cl", new sc_Pair("\u1e9cpred", null))), new sc_Pair(new sc_Pair("\u1e9ccountps-loop",
		new sc_Pair("\u1e9cl", new sc_Pair("\u1e9cpred", new sc_Pair(new sc_Pair("\u1e9czero", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cfact-", new sc_Pair("\u1e9ci", null)), new sc_Pair(new sc_Pair("\u1e9cfact-loop", new sc_Pair("\u1e9ci", new sc_Pair(1, null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9creverse-", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9creverse-loop", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cnil", null), null))),
		null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdivides", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cassume-true", new sc_Pair("\u1e9cvar", new sc_Pair("\u1e9calist", null))), new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cvar", new sc_Pair(new sc_Pair("\u1e9ct",
		null), null))), new sc_Pair("\u1e9calist", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cassume-false", new sc_Pair("\u1e9cvar", new sc_Pair("\u1e9calist", null))), new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cvar", new sc_Pair(new sc_Pair("\u1e9cf", null), null))), new sc_Pair("\u1e9calist", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctautology-checker", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9ctautologyp",
		new sc_Pair(new sc_Pair("\u1e9cnormalize", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cfalsify", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cfalsify1", new sc_Pair(new sc_Pair("\u1e9cnormalize", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cprime", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cand",
		new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair(new sc_Pair("\u1e9czero", null), null)), null))), null)), new sc_Pair(new sc_Pair("\u1e9cprime1", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9csub1", new sc_Pair("\u1e9cx", null)), null))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cand",
		new sc_Pair("\u1e9cp", new sc_Pair("\u1e9cq", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cp", new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cq", new sc_Pair(new sc_Pair("\u1e9ct", null), new sc_Pair(new sc_Pair("\u1e9cf", null), null)))), new sc_Pair(new sc_Pair("\u1e9cf", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair("\u1e9cp", new sc_Pair("\u1e9cq", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cp", new sc_Pair(new sc_Pair("\u1e9ct",
		null), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cq", new sc_Pair(new sc_Pair("\u1e9ct", null), new sc_Pair(new sc_Pair("\u1e9cf", null), null)))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair("\u1e9cp", null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cp", new sc_Pair(new sc_Pair("\u1e9cf", null), new sc_Pair(new sc_Pair("\u1e9ct", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cimplies", new sc_Pair("\u1e9cp",
		new sc_Pair("\u1e9cq", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cp", new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cq", new sc_Pair(new sc_Pair("\u1e9ct", null), new sc_Pair(new sc_Pair("\u1e9cf", null), null)))), new sc_Pair(new sc_Pair("\u1e9ct", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cx", null)), new sc_Pair("\u1e9cx",
		new sc_Pair(new sc_Pair("\u1e9czero", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", new sc_Pair("\u1e9cc", null)))), new sc_Pair("\u1e9cd", new sc_Pair("\u1e9ce", null)))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9ca", new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cb", new sc_Pair("\u1e9cd", new sc_Pair("\u1e9ce", null)))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair("\u1e9cc",
		new sc_Pair("\u1e9cd", new sc_Pair("\u1e9ce", null)))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cx", null)), null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9cplus",
		new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9czerop",
		new sc_Pair("\u1e9ca", null)), new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cb", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cc",
		null))), null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cb", null)), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cc", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy",
		new sc_Pair("\u1e9cx", null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair(new sc_Pair("\u1e9czerop",
		new sc_Pair("\u1e9cy", null)), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair("\u1e9cx", null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cmeaning",
		new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair("\u1e9cy", null)), new sc_Pair("\u1e9ca", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair(new sc_Pair("\u1e9cplus-fringe", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9ca", null))), null)), null))), new sc_Pair("\u1e9cequal",
		new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), null)), new sc_Pair(new sc_Pair("\u1e9cappend",
		new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair("\u1e9cb", null)), new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair("\u1e9ca", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9ctimes",
		new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes",
		new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cexec", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cpds", new sc_Pair("\u1e9cenvrn", null)))),
		new sc_Pair(new sc_Pair("\u1e9cexec", new sc_Pair("\u1e9cy", new sc_Pair(new sc_Pair("\u1e9cexec", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cpds", new sc_Pair("\u1e9cenvrn", null)))), new sc_Pair("\u1e9cenvrn", null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmc-flatten", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cx", null)), new sc_Pair("\u1e9cy", null))), null))), new sc_Pair("\u1e9cequal",
		new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), null))), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cb", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9creverse",
		new sc_Pair("\u1e9cy", null)), null))), new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair("\u1e9cx", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9ca", new sc_Pair(new sc_Pair("\u1e9cintersect", new sc_Pair("\u1e9cb",
		new sc_Pair("\u1e9cc", null))), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cc", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cnth", new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cexp",
		new sc_Pair("\u1e9ci", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cj", new sc_Pair("\u1e9ck", null))), null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair(new sc_Pair("\u1e9cexp", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cj", null))), new sc_Pair(new sc_Pair("\u1e9cexp", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9ck", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cexp", new sc_Pair("\u1e9ci", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cj", new sc_Pair("\u1e9ck",
		null))), null))), new sc_Pair(new sc_Pair("\u1e9cexp", new sc_Pair(new sc_Pair("\u1e9cexp", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cj", null))), new sc_Pair("\u1e9ck", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9creverse-loop", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair("\u1e9cx", null)), new sc_Pair("\u1e9cy", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9creverse-loop",
		new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair("\u1e9cx", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ccount-list", new sc_Pair("\u1e9cz", new sc_Pair(new sc_Pair("\u1e9csort-lp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9ccount-list", new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9ccount-list",
		new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cy", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cc", null))), null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cb", new sc_Pair("\u1e9cc", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9cremainder",
		new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cy", new sc_Pair(new sc_Pair("\u1e9cquotient", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair(new sc_Pair("\u1e9cbig-plus1", new sc_Pair("\u1e9cl", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cbase", null)))), new sc_Pair("\u1e9cbase",
		null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair("\u1e9cl", new sc_Pair("\u1e9cbase", null))), new sc_Pair("\u1e9ci", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair(new sc_Pair("\u1e9cbig-plus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cbase", null))))), new sc_Pair("\u1e9cbase", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ci", new sc_Pair(new sc_Pair("\u1e9cplus",
		new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cbase", null))), new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cbase", null))), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9cy", new sc_Pair(1, null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9cx",
		new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9cquotient", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cj", null))),
		new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9ci", null)), null)), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cj", null)), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cj", new sc_Pair(1, null))), null)), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9cremainder",
		new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), null)), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), null)))), null))), new sc_Pair("\u1e9cequal",
		new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair(new sc_Pair("\u1e9cpower-rep", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cbase", null))), new sc_Pair("\u1e9cbase", null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9ci", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cpower-eval", new sc_Pair(new sc_Pair("\u1e9cbig-plus", new sc_Pair(new sc_Pair("\u1e9cpower-rep", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cbase", null))), new sc_Pair(new sc_Pair("\u1e9cpower-rep", new sc_Pair("\u1e9cj",
		new sc_Pair("\u1e9cbase", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair("\u1e9cbase", null))))), new sc_Pair("\u1e9cbase", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cj", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgcd", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cgcd", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cnth",
		new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair(new sc_Pair("\u1e9cnth", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9cnth", new sc_Pair("\u1e9cb", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9ci", new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair("\u1e9ca", null)), null))), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference",
		new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cy", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cy", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference",
		new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cc", new sc_Pair("\u1e9cw", null))), null))), new sc_Pair(new sc_Pair("\u1e9cdifference",
		new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cc", new sc_Pair("\u1e9cx", null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cw", new sc_Pair("\u1e9cx", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference",
		new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cb", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cc", null))), null))), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cb", new sc_Pair("\u1e9cc", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null)), new sc_Pair("\u1e9cz",
		null))), new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9cy", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9ctimes",
		new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cz", null)), null)), new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy", new sc_Pair(new sc_Pair("\u1e9cplus",
		new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cx", null)), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgcd", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cz", new sc_Pair(new sc_Pair("\u1e9cgcd",
		new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cvalue", new sc_Pair(new sc_Pair("\u1e9cnormalize", new sc_Pair("\u1e9cx", null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cvalue", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9ca", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9ccons",
		new sc_Pair("\u1e9cy", new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnlistp", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clistp", new sc_Pair(new sc_Pair("\u1e9cgopher", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9clistp", new sc_Pair("\u1e9cx", null)), null))),
	new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9csamefringe", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cy", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgreatest-factor", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9czero",
		null), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cy", new sc_Pair(1, null))), null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgreatest-factor", new sc_Pair("\u1e9cx",
		new sc_Pair("\u1e9cy", null))), new sc_Pair(1, null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(1, null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair(new sc_Pair("\u1e9cgreatest-factor", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), new sc_Pair(new sc_Pair("\u1e9cequal",
		new sc_Pair("\u1e9cy", new sc_Pair(1, null))), null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cx", null)), null)), null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ctimes-list", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair(new sc_Pair("\u1e9ctimes-list", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9ctimes-list",
		new sc_Pair("\u1e9cy", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cprime-list", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cprime-list", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cprime-list", new sc_Pair("\u1e9cy", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cz", new sc_Pair(new sc_Pair("\u1e9ctimes",
		new sc_Pair("\u1e9cw", new sc_Pair("\u1e9cz", null))), null))), new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cz", null)), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cz", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cw", new sc_Pair(1, null))), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cgreatereqp", new sc_Pair("\u1e9cx",
		new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cor", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9czero", null), null))),
		new sc_Pair(new sc_Pair("\u1e9cand", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cy", new sc_Pair(1, null))), null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal",
		new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(1, null))), new sc_Pair(sc_list("\u1e9cand", new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9ca", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), null)), new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair("\u1e9cb", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), null)), new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9ca", null)), new sc_Pair("\u1e9cnumberp",
		new sc_Pair("\u1e9cb", null)), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9csub1", new sc_Pair("\u1e9ca", null)), new sc_Pair(new sc_Pair("\u1e9czero", null), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9csub1", new sc_Pair("\u1e9cb", null)), new sc_Pair(new sc_Pair("\u1e9czero", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair(new sc_Pair("\u1e9cdelete", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cl",
		null))), null)), new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair("\u1e9cl", null)), null))), new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cl", null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9csort2", new sc_Pair(new sc_Pair("\u1e9cdelete", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cl", null))), null)), new sc_Pair(new sc_Pair("\u1e9cdelete", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9csort2", new sc_Pair("\u1e9cl", null)), null))), null))), new sc_Pair("\u1e9cequal",
		new sc_Pair(new sc_Pair("\u1e9cdsort", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9csort2", new sc_Pair("\u1e9cx", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx1", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx2", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx3", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx4", new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx5",
		new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair("\u1e9cx6", new sc_Pair("\u1e9cx7", null))), null))), null))), null))), null))), null))), null)), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(6, new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair("\u1e9cx7", null)), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(2, null))), new sc_Pair(new sc_Pair("\u1e9cfix",
		new sc_Pair("\u1e9cx", null)), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cquotient", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(2, null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cquotient", new sc_Pair("\u1e9cy", new sc_Pair(2, null))), null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9csigma",
		new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9cquotient", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9ci", new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9ci", null)), null))), new sc_Pair(2, null))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9cy", null)), null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9cnumberp",
		new sc_Pair("\u1e9cy", null)), new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9cx", null)), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cy", null))), null))),
		new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cz", null))), null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cnot", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx",
			null))), null)), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cz", null)), null))), null)))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair(new sc_Pair("\u1e9cdelete", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9cmember",
		new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair("\u1e9cy", null)), new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9ca", null))), null))), new sc_Pair(new sc_Pair("\u1e9cmeaning", new sc_Pair(new sc_Pair("\u1e9cplus-tree", new sc_Pair("\u1e9cy", null)), new sc_Pair("\u1e9ca", null))), null)))), null))), new sc_Pair("\u1e9cequal",
		new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cadd1", new sc_Pair("\u1e9cy", null)), null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9cnumberp", new sc_Pair("\u1e9cy", null)), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null))), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), null)))), null))), new sc_Pair("\u1e9cequal",
		new sc_Pair(new sc_Pair("\u1e9cnth", new sc_Pair(new sc_Pair("\u1e9cnil", null), new sc_Pair("\u1e9ci", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9ci", null)), new sc_Pair(new sc_Pair("\u1e9cnil", null), new sc_Pair(new sc_Pair("\u1e9czero", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9clast", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), null)), new sc_Pair(new sc_Pair("\u1e9cif",
		new sc_Pair(new sc_Pair("\u1e9clistp", new sc_Pair("\u1e9cb", null)), new sc_Pair(new sc_Pair("\u1e9clast", new sc_Pair("\u1e9cb", null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clistp", new sc_Pair("\u1e9ca", null)), new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair(new sc_Pair("\u1e9ccar", new sc_Pair(new sc_Pair("\u1e9clast", new sc_Pair("\u1e9ca", null)), null)), new sc_Pair("\u1e9cb", null))), new sc_Pair("\u1e9cb", null)))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cequal",
		new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clessp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9ct", null), new sc_Pair("\u1e9cz", null))), new sc_Pair(new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cf", null), new sc_Pair("\u1e9cz", null))), null)))), null))), new sc_Pair("\u1e9cequal",
		new sc_Pair(new sc_Pair("\u1e9cassignment", new sc_Pair("\u1e9cx", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9cassignedp", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cassignment", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9ca", null))), new sc_Pair(new sc_Pair("\u1e9cassignment", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cb", null))), null)))), null))), new sc_Pair("\u1e9cequal",
		new sc_Pair(new sc_Pair("\u1e9ccar", new sc_Pair(new sc_Pair("\u1e9cgopher", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clistp", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9ccar", new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9czero", null), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair(new sc_Pair("\u1e9ccdr", new sc_Pair(new sc_Pair("\u1e9cgopher",
		new sc_Pair("\u1e9cx", null)), null)), null)), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9clistp", new sc_Pair("\u1e9cx", null)), new sc_Pair(new sc_Pair("\u1e9ccdr", new sc_Pair(new sc_Pair("\u1e9cflatten", new sc_Pair("\u1e9cx", null)), null)), new sc_Pair(new sc_Pair("\u1e9ccons", new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cquotient", new sc_Pair(new sc_Pair("\u1e9ctimes",
		new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cx", null))), new sc_Pair("\u1e9cy", null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9czerop", new sc_Pair("\u1e9cy", null)), new sc_Pair(new sc_Pair("\u1e9czero", null), new sc_Pair(new sc_Pair("\u1e9cfix", new sc_Pair("\u1e9cx", null)), null)))), null))), new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cget", new sc_Pair("\u1e9cj", new sc_Pair(new sc_Pair("\u1e9cset", new sc_Pair("\u1e9ci", new sc_Pair("\u1e9cval", new sc_Pair("\u1e9cmem", null)))),
		null))), new sc_Pair(new sc_Pair("\u1e9cif", new sc_Pair(new sc_Pair("\u1e9ceqp", new sc_Pair("\u1e9cj", new sc_Pair("\u1e9ci", null))), new sc_Pair("\u1e9cval", new sc_Pair(new sc_Pair("\u1e9cget", new sc_Pair("\u1e9cj", new sc_Pair("\u1e9cmem", null))), null)))), null))));
const_nboyer = new sc_Pair(new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cf", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cc", new sc_Pair(new sc_Pair("\u1e9czero", null), null))), null))), null))), new sc_Pair(new sc_Pair("\u1e9cy", new sc_Pair("\u1e9cf", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair(new sc_Pair("\u1e9ctimes", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))),
	new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9cc", new sc_Pair("\u1e9cd", null))), null))), null))), new sc_Pair(new sc_Pair("\u1e9cz", new sc_Pair("\u1e9cf", new sc_Pair(new sc_Pair("\u1e9creverse", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair(new sc_Pair("\u1e9cappend", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cnil", null), null))), null)), null))), new sc_Pair(new sc_Pair("\u1e9cu", new sc_Pair("\u1e9cequal", new sc_Pair(new sc_Pair("\u1e9cplus", new sc_Pair("\u1e9ca",
	new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cdifference", new sc_Pair("\u1e9cx", new sc_Pair("\u1e9cy", null))), null)))), new sc_Pair(new sc_Pair("\u1e9cw", new sc_Pair("\u1e9clessp", new sc_Pair(new sc_Pair("\u1e9cremainder", new sc_Pair("\u1e9ca", new sc_Pair("\u1e9cb", null))), new sc_Pair(new sc_Pair("\u1e9cmember", new sc_Pair("\u1e9ca", new sc_Pair(new sc_Pair("\u1e9clength", new sc_Pair("\u1e9cb", null)), null))), null)))), null)))));
BgL_nboyerzd2benchmarkzd2 = function() {
	for (var a = null, b = arguments.length - 1; 0 <= b; b--) a = sc_cons(arguments[b], a);
	var c;
	return c = null === a ? 0 : a.car, BgL_setupzd2boyerzd2(), BgL_runzd2benchmarkzd2("nboyer" + sc_number2string(c), 1, function() {
		return BgL_testzd2boyerzd2(c)
	}, function(a) {
		if (sc_isNumber(a)) switch (c) {
			case 0:
				return 95024 === a;
			case 1:
				return 591777 === a;
			case 2:
				return 1813975 === a;
			case 3:
				return 5375678 === a;
			case 4:
				return 16445406 === a;
			case 5:
				return 51507739 === a;
			default:
				return !0
		} else return !1
	})
};
BgL_setupzd2boyerzd2 = function() {
	return !0
};
BgL_testzd2boyerzd2 = function() {
	return !0
};
translate_term_nboyer = function(a) {
	var b;
	return a instanceof sc_Pair ? new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(a.car), (b = a.cdr, null === b ? null : new sc_Pair(translate_term_nboyer(b.car), translate_args_nboyer(b.cdr)))) : a
};
translate_args_nboyer = function(a) {
	var b, c;
	return null === a ? null : new sc_Pair((c = a.car, c instanceof sc_Pair ? new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(c.car), translate_args_nboyer(c.cdr)) : c), (b = a.cdr, null === b ? null : new sc_Pair(translate_term_nboyer(b.car), translate_args_nboyer(b.cdr))))
};
untranslate_term_nboyer = function(a) {
	var b, c, d, e;
	if (a instanceof sc_Pair) {
		d = new sc_Pair(null, null);
		c = a.cdr;
		for (b = d; null !== c;) b.cdr = new sc_Pair(untranslate_term_nboyer(c.car), null), b = b.cdr, c = c.cdr;
		b = d.cdr;
		return new sc_Pair((e = a.car, e[0]), b)
	}
	return a
};
BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer = function(a) {
	var b, c;
	return c = sc_assq(a, BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer), !1 !== c ? c.cdr : (b = [a, null], BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer = new sc_Pair(new sc_Pair(a, b), BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer), b)
};
BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer = null;
translate_alist_nboyer = function(a) {
	var b, c;
	return null === a ? null : new sc_Pair(new sc_Pair(a.car.car, (c = a.car.cdr, c instanceof sc_Pair ? new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(c.car), translate_args_nboyer(c.cdr)) : c)), (b = a.cdr, null === b ? null : new sc_Pair(new sc_Pair(b.car.car, translate_term_nboyer(b.car.cdr)), translate_alist_nboyer(b.cdr))))
};
apply_subst_nboyer = function(a, b) {
	var c, d;
	return b instanceof sc_Pair ? new sc_Pair(b.car, (c = b.cdr, null === c ? null : new sc_Pair(apply_subst_nboyer(a, c.car), apply_subst_lst_nboyer(a, c.cdr)))) : (d = sc_assq(b, a), !1 !== d ? d.cdr : b)
};
apply_subst_lst_nboyer = function(a, b) {
	var c;
	return null === b ? null : new sc_Pair(apply_subst_nboyer(a, b.car), (c = b.cdr, null === c ? null : new sc_Pair(apply_subst_nboyer(a, c.car), apply_subst_lst_nboyer(a, c.cdr))))
};
tautologyp_nboyer = function(a, b, c) {
	for (var d, e, f, h, g, k;;) {
		if (!1 !== (k = is_term_equal_nboyer(a, true_term_nboyer), !1 !== k ? k : is_term_member_nboyer(a, b))) return !0;
		if (!1 === (g = is_term_equal_nboyer(a, false_term_nboyer), !1 !== g ? g : is_term_member_nboyer(a, c)) && a instanceof sc_Pair)
			if (a.car === if_constructor_nboyer)
				if (!1 !== (h = a.cdr.car, f = is_term_equal_nboyer(h, true_term_nboyer), !1 !== f ? f : is_term_member_nboyer(h, b))) a = a.cdr.cdr.car;
				else if (!1 !== (e = a.cdr.car, d = is_term_equal_nboyer(e, false_term_nboyer), !1 !== d ? d : is_term_member_nboyer(e,
				c))) a = a.cdr.cdr.cdr.car;
		else if (!1 !== tautologyp_nboyer(a.cdr.cdr.car, new sc_Pair(a.cdr.car, b), c)) c = new sc_Pair(a.cdr.car, c), a = a.cdr.cdr.cdr.car;
		else return !1;
		else return !1;
		else return !1
	}
};
if_constructor_nboyer = "\u1e9c*";
rewrite_count_nboyer = 0;
rewrite_nboyer = function(a) {
	var b, c, d, e;
	++rewrite_count_nboyer;
	if (a instanceof sc_Pair)
		for (c = new sc_Pair(a.car, (e = a.cdr, null === e ? null : new sc_Pair(rewrite_nboyer(e.car), rewrite_args_nboyer(e.cdr)))), a = (d = a.car, d[1]);;) {
			if (null === a) return c;
			if (!1 !== (b = a.car.cdr.car, unify_subst_nboyer = null, one_way_unify1_nboyer(c, b))) return rewrite_nboyer(apply_subst_nboyer(unify_subst_nboyer, a.car.cdr.cdr.car));
			a = a.cdr
		} else return a
};
rewrite_args_nboyer = function(a) {
	var b;
	return null === a ? null : new sc_Pair(rewrite_nboyer(a.car), (b = a.cdr, null === b ? null : new sc_Pair(rewrite_nboyer(b.car), rewrite_args_nboyer(b.cdr))))
};
unify_subst_nboyer = "\u1e9c*";
one_way_unify1_nboyer = function(a, b) {
	var c, d;
	if (b instanceof sc_Pair)
		if (a instanceof sc_Pair)
			if (a.car === b.car)
				for (c = a.cdr, d = b.cdr;;) {
					if (null === c) return null === d;
					if (null !== d && !1 !== one_way_unify1_nboyer(c.car, d.car)) c = c.cdr, d = d.cdr;
					else return !1
				} else return !1;
			else return !1;
	else {
		c = sc_assq(b, unify_subst_nboyer);
		if (!1 !== c) return is_term_equal_nboyer(a, c.cdr);
		if (sc_isNumber(b)) return sc_isEqual(a, b);
		unify_subst_nboyer = new sc_Pair(new sc_Pair(b, a), unify_subst_nboyer);
		return !0
	}
};
true_term_nboyer = false_term_nboyer = "\u1e9c*";
trans_of_implies1_nboyer = function(a) {
	var b;
	return sc_isEqual(a, 1) ? sc_list("\u1e9cimplies", 0, 1) : sc_list("\u1e9cand", sc_list("\u1e9cimplies", a - 1, a), (b = a - 1, sc_isEqual(b, 1) ? sc_list("\u1e9cimplies", 0, 1) : sc_list("\u1e9cand", sc_list("\u1e9cimplies", b - 1, b), trans_of_implies1_nboyer(b - 1))))
};
is_term_equal_nboyer = function(a, b) {
	var c, d;
	if (a instanceof sc_Pair)
		if (b instanceof sc_Pair)
			if (!1 !== (d = a.car, c = b.car, d === c))
				for (c = a.cdr, d = b.cdr;;) {
					if (null === c) return null === d;
					if (null !== d && !1 !== is_term_equal_nboyer(c.car, d.car)) c = c.cdr, d = d.cdr;
					else return !1
				} else return !1;
			else return !1;
	else return sc_isEqual(a, b)
};
is_term_member_nboyer = function(a, b) {
	for (;;) {
		if (null === b) return !1;
		if (!1 !== is_term_equal_nboyer(a, b.car)) return !0;
		b = b.cdr
	}
};
BgL_setupzd2boyerzd2 = function() {
	var a, b, c, d, e;
	BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer = null;
	if_constructor_nboyer = BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer("\u1e9cif");
	false_term_nboyer = (b = new sc_Pair("\u1e9cf", null), b instanceof sc_Pair ? new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(b.car), translate_args_nboyer(b.cdr)) : b);
	true_term_nboyer = (e = new sc_Pair("\u1e9ct", null), e instanceof sc_Pair ? new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(e.car), translate_args_nboyer(e.cdr)) :
		e);
	for (e = sc_const_3_nboyer; null !== e;) b = e.car, b instanceof sc_Pair && "\u1e9cequal" === b.car && b.cdr.car instanceof sc_Pair ? (a = b.cdr.car.car, b = new sc_Pair(b instanceof sc_Pair ? new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(b.car), translate_args_nboyer(b.cdr)) : b, (d = b.cdr.car.car, c = BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(d), c[1])), a = BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(a), a[1] = b) : sc_error("ADD-LEMMA did not like term:  ", b), e = e.cdr;
	return !0
};
BgL_testzd2boyerzd2 = function(a) {
	var b;
	rewrite_count_nboyer = 0;
	for (b = sc_const_4_nboyer; 0 !== a;) b = sc_list("\u1e9cor", b, new sc_Pair("\u1e9cf", null)), --a;
	b = b instanceof sc_Pair ? new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(b.car), translate_args_nboyer(b.cdr)) : b;
	b = apply_subst_nboyer(null === const_nboyer ? null : new sc_Pair(new sc_Pair(const_nboyer.car.car, translate_term_nboyer(const_nboyer.car.cdr)), translate_alist_nboyer(const_nboyer.cdr)), b);
	b = tautologyp_nboyer(rewrite_nboyer(b), null, null);
	sc_write(rewrite_count_nboyer);
	sc_display(" rewrites");
	sc_newline();
	return !1 !== b ? rewrite_count_nboyer : !1
};
var BgL_parsezd2ze3nbzd2treesze3, BgL_earleyzd2benchmarkzd2, BgL_parsezd2ze3parsedzf3zc2, test, BgL_parsezd2ze3treesz31, BgL_makezd2parserzd2, const_earley;
const_earley = new sc_Pair(new sc_Pair("\u1e9cs", new sc_Pair(new sc_Pair("\u1e9ca", null), new sc_Pair(new sc_Pair("\u1e9cs", new sc_Pair("\u1e9cs", null)), null))), null);
BgL_makezd2parserzd2 = function(a, b) {
	var c, d, e, f, h, g, k, m, r, I, p, q, G, y;
	y = function(a, b) {
		var c;
		for (c = b.length - 1;;)
			if (0 <= c) {
				if (sc_isEqual(b[c], a)) return c;
				--c
			} else return !1
	};
	q = (G = function(a, b) {
			var c, d, e;
			return a instanceof sc_Pair ? (e = a.car, d = e.car, c = function(b, d) {
				var e, f, g;
				if (b instanceof sc_Pair) {
					f = e = b.car;
					for (g = d; f instanceof sc_Pair;) e = f.car, f = f.cdr, g = !1 !== sc_member(e, g) ? g : new sc_Pair(e, g);
					return c(b.cdr, g)
				}
				return G(a.cdr, d)
			}, c(e.cdr, !1 !== sc_member(d, b) ? b : new sc_Pair(d, b))) : sc_list2vector(sc_reverse(b))
		},
		G(a, null));
	p = q.length;
	c = (I = function(a, b) {
		var c, d;
		return a instanceof sc_Pair ? (d = a.car, c = function(b, d) {
			var e, f;
			if (b instanceof sc_Pair) {
				e = b.car;
				for (f = d; e instanceof sc_Pair;) e = e.cdr, ++f;
				return c(b.cdr, f + 1)
			}
			return I(a.cdr, d)
		}, c(d.cdr, b)) : b
	}, I(a, 0)) + p;
	r = sc_makeVector(p, null);
	m = sc_makeVector(p, null);
	k = sc_makeVector(p, null);
	g = sc_makeVector(c, !1);
	h = sc_makeVector(c, !1);
	f = q.length;
	for (c = f - 1; 0 <= c;) g[c] = c - f, h[c] = sc_list(q[c], 0), m[c] = sc_list(c), --c;
	e = function(a, b) {
		var c, d, J;
		return a instanceof sc_Pair ? (J = a.car,
			d = J.car, c = function(b, C, J) {
				var x, D;
				if (b instanceof sc_Pair) {
					D = b.car;
					h[C] = sc_list(d, J);
					x = y(d, q);
					r[x] = new sc_Pair(C, r[x]);
					for (x = D; x instanceof sc_Pair;) D = x.car, g[C] = y(D, q), D = y(D, q), k[D] = new sc_Pair(C, k[D]), x = x.cdr, ++C;
					g[C] = y(d, q) - f;
					x = y(d, q);
					m[x] = new sc_Pair(C, m[x]);
					return c(b.cdr, C + 1, J + 1)
				}
				return e(a.cdr, C)
			}, c(J.cdr, b, 1)) : void 0
	};
	e(a, q.length);
	d = [b, q, r, m, k, g, h];
	return function(a) {
		var b, c, e, f, g, h, k, m, q, z, l, A, r, y, E, p, B, I, H, U, K, N, L, O, M, G, P, V, Y, W, X;
		O = function(a, b) {
			var c;
			for (c = b.length - 1;;)
				if (0 <= c) {
					if (sc_isEqual(b[c],
							a)) return c;
					--c
				} else return !1
		};
		E = function(a, b) {
			var c, d, e;
			e = sc_makeVector(a + 1, !1);
			for (d = a; 0 <= d;) c = sc_makeVector(b + 1, !1), c[0] = -1, e[d] = c, --d;
			return e
		};
		M = function(a, b, c) {
			var d, e;
			return e = a[c + 1], !1 !== e ? e : (d = sc_makeVector(b + 6, !1), d[1] = -3, d[2] = -1, d[3] = -1, d[4] = -1, a[c + 1] = d, d)
		};
		G = function(a) {
			return a[a[1] + 5] = a[4], a[1] = a[3], a[3] = -1, a[4] = -1
		};
		P = function(a, b, c, d) {
			var e;
			return e = b[3], b[d + 5] = -1, b[e + 5] = d, b[3] = d, 0 > e ? (b[0] = a[0], a[0] = c) : void 0
		};
		p = function(a, b, c, d) {
			var e, f;
			a = a[b];
			for (f = c; f instanceof sc_Pair;) e = f.car,
				c = M(a, b, e), !1 === c[d + 5] && P(a, c, e, d), f = f.cdr
		};
		V = function(a, b, c, d, e) {
			var f, g, h, u;
			return u = a[c], !1 !== (h = u[d + 1], !1 !== h ? h[e + 5] : !1) ? (g = b[c], f = M(g, c, d), !1 === f[e + 5] ? P(g, f, d, e) : void 0, !0) : !1
		};
		Y = function(a, b, c, d) {
			var e;
			for (e = d[2]; 0 <= e;) !1 === b[e + 5] && P(a, b, c, e), e = d[e + 5]
		};
		z = function(a, b, c, d, e, f, g) {
			var h, u, k, v, n, Z, m, q, l, r, t, T, p, w;
			w = a[b];
			for (p = g.length;;)
				if (t = w[0], 0 <= t)
					if (T = f[t], g = w[t + 1], Z = g[4], w[0] = g[0], G(g), 0 <= T) {
						for (u = c[T]; u instanceof sc_Pair;) h = u.car, v = M(w, b, h), !1 === v[b + 5] && P(w, v, h, b), u = u.cdr;
						for (v = d[T]; v instanceof sc_Pair;) h = v.car, !1 !== (k = w[h + 1], !1 !== k ? k[b + 5] : !1) && (u = t + 1, h = M(w, b, u), Y(w, h, u, g)), v = v.cdr
					} else t = e[T + p], r = a, l = w, q = b, m = g, n = function(a) {
						var b, c, d, e, f, g;
						if (a instanceof sc_Pair) {
							g = a.car;
							for (f = Z; 0 <= f;) e = (b = r[f], b[g + 1]), !1 !== e && (d = g + 1, c = M(l, q, d), Y(l, c, d, e)), f = m[f + 5];
							return n(a.cdr)
						}
					}, n(t);
			else break
		};
		W = function(a, b, c, d, e, f, g, h, u) {
			var k, v, n;
			return n = f[a], !1 !== n ? a < u ? sc_list(sc_list(n, g[b].car)) : sc_list(sc_list(n)) : (v = a - 1, k = function(a, n) {
				for (var F, m, q, t;;)
					if (a instanceof sc_Pair) {
						t = a.car;
						m = (q = h[c], q[t + 1]);
						if (!1 !== m) return F = function(n, q) {
							for (var w, l, r, p;;)
								if (0 <= n) {
									if (n >= b && !1 !== (p = h[n], l = p[v + 1], !1 !== l ? l[b + 5] : !1)) return r = W(v, b, n, d, e, f, g, h, u), l = W(t, n, c, d, e, f, g, h, u), w = function(a, b) {
										var c, d, e;
										if (a instanceof sc_Pair) {
											e = sc_list(a.car);
											c = r;
											for (d = b; c instanceof sc_Pair;) d = new sc_Pair(sc_append(c.car, e), d), c = c.cdr;
											return w(a.cdr, d)
										}
										return F(m[n + 5], b)
									}, w(l, q);
									n = m[n + 5]
								} else return k(a.cdr, q)
						}, F(m[2], n);
						a = a.cdr
					} else return n
			}, k(d[e[v]], null))
		};
		X = function(a, b, c, d, e, f, g, h) {
			var k, m, v;
			return v = a - 1, !1 !== (m = a < h, !1 !==
				m ? m : 0 > e[v]) ? 1 : (k = function(a, m) {
				for (var F, q, l, r, t, p, S, w;;)
					if (a instanceof sc_Pair) {
						w = a.car;
						S = (F = g[c], F[w + 1]);
						if (!1 !== S) {
							t = S[2];
							for (p = m; 0 <= t;) t >= b && !1 !== (r = g[t], l = r[v + 1], !1 !== l ? l[b + 5] : !1) ? (q = X(v, b, t, d, e, f, g, h), F = X(w, t, c, d, e, f, g, h), t = S[t + 5], p += q * F) : t = S[t + 5];
							return k(a.cdr, p)
						}
						a = a.cdr
					} else return m
			}, k(d[e[v]], 0))
		};
		l = d[0];
		L = d[1];
		N = d[2];
		K = d[3];
		U = d[4];
		H = d[5];
		I = d[6];
		B = new sc_Pair(null, null);
		l = l(a);
		for (a = B; null !== l;) {
			y = l.car;
			A = y.cdr;
			for (r = null; A instanceof sc_Pair;) b = O(A.car, L), !1 !== b ? (A = A.cdr, r = new sc_Pair(b,
				r)) : A = A.cdr;
			b = new sc_Pair(y.car, sc_reverse(r));
			b = new sc_Pair(b, null);
			a.cdr = b;
			a = a.cdr;
			l = l.cdr
		}
		a = sc_list2vector(B.cdr);
		A = a.length;
		B = E(A, H.length);
		p(B, 0, N[0], 0);
		z(B, 0, N, K, U, H, L);
		for (b = 0; b < A;) l = a[b].cdr, p(B, b + 1, l, b), z(B, b + 1, N, K, U, H, L), ++b;
		z = a.length;
		l = H.length;
		p = L.length;
		E = E(z, l);
		for (b = K[0]; b instanceof sc_Pair;) l = b.car, V(B, E, z, l, 0), b = b.cdr;
		for (; 0 <= z;) q = B, m = E, k = z, h = K, g = H, f = p, e = E[z], c = function() {
			var a, b, d, l, p, r, Q, R, u;
			u = e[0];
			if (0 <= u) {
				R = e[u + 1];
				Q = R[4];
				e[0] = R[0];
				for (G(R); 0 <= Q;) r = Q, p = k, l = q, d = m, b = u - 1, u >= f &&
					0 <= g[b] && (a = function(c) {
						for (var e, f, g;;)
							if (c instanceof sc_Pair) {
								g = c.car;
								f = (e = l[p], e[g + 1]);
								if (!1 !== f) {
									for (e = f[2]; 0 <= e;) e >= r && !1 !== V(l, d, e, b, r) && V(l, d, p, g, e), e = f[e + 5];
									return a(c.cdr)
								}
								c = c.cdr
							} else break
					}, a(h[g[b]])), Q = R[Q + 5];
				return c()
			}
		}, c(), --z;
		return [L, N, K, U, H, I, a, E, function(a, b, c, d, e, f) {
			var g, h;
			a = O(a, d);
			if (!1 !== a)
				for (d.length, e = e[a];;)
					if (e instanceof sc_Pair) {
						d = e.car;
						if (!1 !== (h = f[c], g = h[d + 1], !1 !== g ? g[b + 5] : !1)) return !0;
						e = e.cdr
					} else return !1;
			else return !1
		}, function(a, b, c, d, e, f, g, h, k) {
			var m, l, n, p;
			a =
				O(a, d);
			if (!1 !== a) {
				d = d.length;
				n = e[a];
				for (p = null; n instanceof sc_Pair;) a = n.car, !1 !== (l = k[c], m = l[a + 1], !1 !== m ? m[b + 5] : !1) ? (n = n.cdr, p = sc_append(W(a, b, c, e, f, g, h, k, d), p)) : n = n.cdr;
				return p
			}
			return !1
		}, function(a, b, c, d, e, f, g, h) {
			var k, m, l, n;
			a = O(a, d);
			if (!1 !== a) {
				d = d.length;
				l = e[a];
				for (n = 0; l instanceof sc_Pair;) a = l.car, !1 !== (m = h[c], k = m[a + 1], !1 !== k ? k[b + 5] : !1) ? (l = l.cdr, n = X(a, b, c, e, f, g, h, d) + n) : l = l.cdr;
				return n
			}
			return !1
		}]
	}
};
BgL_parsezd2ze3parsedzf3zc2 = function(a, b, c, d) {
	var e, f, h, g;
	return g = a[0], h = a[2], f = a[7], e = a[8], e(b, c, d, g, h, f)
};
BgL_parsezd2ze3treesz31 = function(a, b, c, d) {
	var e, f, h, g, k, m, r;
	return r = a[0], m = a[2], k = a[4], g = a[5], h = a[6], f = a[7], e = a[9], e(b, c, d, r, m, k, g, h, f)
};
BgL_parsezd2ze3nbzd2treesze3 = function(a, b, c, d) {
	var e, f, h, g, k, m;
	return m = a[0], k = a[2], g = a[4], h = a[6], f = a[7], e = a[10], e(b, c, d, m, k, g, h, f)
};
test = function(a) {
	var b, c;
	return c = BgL_makezd2parserzd2(const_earley, function(a) {
		var b, c, h;
		for (c = h = new sc_Pair(null, null); null !== a;) c.cdr = new sc_Pair((b = a.car, sc_list(b, b)), null), c = c.cdr, a = a.cdr;
		return h.cdr
	}), b = c(sc_vector2list(sc_makeVector(a, "\u1e9ca"))), sc_length(BgL_parsezd2ze3treesz31(b, "\u1e9cs", 0, a))
};
BgL_earleyzd2benchmarkzd2 = function() {
	for (var a = null, b = arguments.length - 1; 0 <= b; b--) a = sc_cons(arguments[b], a);
	var c;
	return c = null === a ? 7 : a.car, BgL_runzd2benchmarkzd2("earley", 1, function() {
		return test(c)
	}, function(a) {
		return sc_display(a), sc_newline(), 132 == a
	})
};
SC_ERROR_OUT = SC_DEFAULT_OUT = new sc_GenericOutputPort(function(a) {});

function RunBenchmark(a, b, c, d) {
	for (a = 0; a < b; ++a)
		if (result = c(), !d(result)) throw Error("Earley or Boyer did incorrect number of rewrites");
}
var BgL_runzd2benchmarkzd2 = RunBenchmark;
BgL_earleyzd2benchmarkzd2();
BgL_nboyerzd2benchmarkzd2();