(function(v, n) {
  function ua(a) {
    var b = a.length, c = d.type(a);
    return d.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || "function" !== c && (0 === b || "number" === typeof b && 0 < b && b - 1 in a);
  }
  function Cb(a) {
    var b = Na[a] = {};
    d.each(a.match(M) || [], function(a, d) {
      b[d] = !0;
    });
    return b;
  }
  function P() {
    Object.defineProperty(this.cache = {}, 0, {get:function() {
      return{};
    }});
    this.expando = d.expando + Math.random();
  }
  function Oa(a, b, c) {
    if (c === n && 1 === a.nodeType) {
      if (c = "data-" + b.replace(Db, "-$1").toLowerCase(), c = a.getAttribute(c), "string" === typeof c) {
        try {
          c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : Eb.test(c) ? JSON.parse(c) : c;
        } catch (d) {
        }
        y.set(a, b, c);
      } else {
        c = n;
      }
    }
    return c;
  }
  function la() {
    return!0;
  }
  function O() {
    return!1;
  }
  function Pa() {
    try {
      return t.activeElement;
    } catch (a) {
    }
  }
  function Qa(a, b) {
    for (;(a = a[b]) && 1 !== a.nodeType;) {
    }
    return a;
  }
  function Ra(a, b, c) {
    if (d.isFunction(b)) {
      return d.grep(a, function(a, d) {
        return!!b.call(a, d, a) !== c;
      });
    }
    if (b.nodeType) {
      return d.grep(a, function(a) {
        return a === b !== c;
      });
    }
    if ("string" === typeof b) {
      if (Fb.test(b)) {
        return d.filter(b, a, c);
      }
      b = d.filter(b, a);
    }
    return d.grep(a, function(a) {
      return 0 <= ma.call(b, a) !== c;
    });
  }
  function Sa(a, b) {
    return d.nodeName(a, "table") && d.nodeName(1 === b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
  }
  function Gb(a) {
    a.type = (null !== a.getAttribute("type")) + "/" + a.type;
    return a;
  }
  function Hb(a) {
    var b = Ib.exec(a.type);
    b ? a.type = b[1] : a.removeAttribute("type");
    return a;
  }
  function xa(a, b) {
    for (var c = a.length, d = 0;d < c;d++) {
      p.set(a[d], "globalEval", !b || p.get(b[d], "globalEval"));
    }
  }
  function Ta(a, b) {
    var c, e, f, g;
    if (1 === b.nodeType) {
      if (p.hasData(a) && (g = p.access(a), c = d.extend({}, g), g = g.events, p.set(b, c), g)) {
        for (f in delete c.handle, c.events = {}, g) {
          for (c = 0, e = g[f].length;c < e;c++) {
            d.event.add(b, f, g[f][c]);
          }
        }
      }
      y.hasData(a) && (f = y.access(a), f = d.extend({}, f), y.set(b, f));
    }
  }
  function C(a, b) {
    var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
    return b === n || b && d.nodeName(a, b) ? d.merge([a], c) : c;
  }
  function Ua(a, b) {
    if (b in a) {
      return b;
    }
    for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, f = Va.length;f--;) {
      if (b = Va[f] + c, b in a) {
        return b;
      }
    }
    return d;
  }
  function Y(a, b) {
    a = b || a;
    return "none" === d.css(a, "display") || !d.contains(a.ownerDocument, a);
  }
  function Wa(a, b) {
    for (var c, e, f, g = [], h = 0, k = a.length;h < k;h++) {
      e = a[h], e.style && (g[h] = p.get(e, "olddisplay"), c = e.style.display, b ? (g[h] || "none" !== c || (e.style.display = ""), "" === e.style.display && Y(e) && (g[h] = p.access(e, "olddisplay", Jb(e.nodeName)))) : g[h] || (f = Y(e), (c && "none" !== c || !f) && p.set(e, "olddisplay", f ? c : d.css(e, "display"))));
    }
    for (h = 0;h < k;h++) {
      e = a[h], !e.style || b && "none" !== e.style.display && "" !== e.style.display || (e.style.display = b ? g[h] || "" : "none");
    }
    return a;
  }
  function Xa(a, b, c) {
    return(a = Kb.exec(b)) ? Math.max(0, a[1] - (c || 0)) + (a[2] || "px") : b;
  }
  function Ya(a, b, c, e, f) {
    b = c === (e ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
    for (var g = 0;4 > b;b += 2) {
      "margin" === c && (g += d.css(a, c + S[b], !0, f)), e ? ("content" === c && (g -= d.css(a, "padding" + S[b], !0, f)), "margin" !== c && (g -= d.css(a, "border" + S[b] + "Width", !0, f))) : (g += d.css(a, "padding" + S[b], !0, f), "padding" !== c && (g += d.css(a, "border" + S[b] + "Width", !0, f)));
    }
    return g;
  }
  function Za(a, b, c) {
    var e = !0, f = "width" === b ? a.offsetWidth : a.offsetHeight, g = v.getComputedStyle(a, null), h = d.support.boxSizing && "border-box" === d.css(a, "boxSizing", !1, g);
    if (0 >= f || null == f) {
      f = Z(a, b, g);
      if (0 > f || null == f) {
        f = a.style[b];
      }
      if (Ca.test(f)) {
        return f;
      }
      e = h && (d.support.boxSizingReliable || f === a.style[b]);
      f = parseFloat(f) || 0;
    }
    return f + Ya(a, b, c || (h ? "border" : "content"), e, g) + "px";
  }
  function Jb(a) {
    var b = t, c = $a[a];
    c || (c = ab(a, b), "none" !== c && c || (aa = (aa || d("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement), b = (aa[0].contentWindow || aa[0].contentDocument).document, b.write("<!doctype html><html><body>"), b.close(), c = ab(a, b), aa.detach()), $a[a] = c);
    return c;
  }
  function ab(a, b) {
    var c = d(b.createElement(a)).appendTo(b.body), e = d.css(c[0], "display");
    c.remove();
    return e;
  }
  function Da(a, b, c, e) {
    var f;
    if (d.isArray(b)) {
      d.each(b, function(b, d) {
        c || Lb.test(a) ? e(a, d) : Da(a + "[" + ("object" === typeof d ? b : "") + "]", d, c, e);
      });
    } else {
      if (c || "object" !== d.type(b)) {
        e(a, b);
      } else {
        for (f in b) {
          Da(a + "[" + f + "]", b[f], c, e);
        }
      }
    }
  }
  function bb(a) {
    return function(b, c) {
      "string" !== typeof b && (c = b, b = "*");
      var e, f = 0, g = b.toLowerCase().match(M) || [];
      if (d.isFunction(c)) {
        for (;e = g[f++];) {
          "+" === e[0] ? (e = e.slice(1) || "*", (a[e] = a[e] || []).unshift(c)) : (a[e] = a[e] || []).push(c);
        }
      }
    };
  }
  function cb(a, b, c, e) {
    function f(k) {
      var l;
      g[k] = !0;
      d.each(a[k] || [], function(a, d) {
        var k = d(b, c, e);
        if ("string" === typeof k && !h && !g[k]) {
          return b.dataTypes.unshift(k), f(k), !1;
        }
        if (h) {
          return!(l = k);
        }
      });
      return l;
    }
    var g = {}, h = a === Ea;
    return f(b.dataTypes[0]) || !g["*"] && f("*");
  }
  function Fa(a, b) {
    var c, e, f = d.ajaxSettings.flatOptions || {};
    for (c in b) {
      b[c] !== n && ((f[c] ? a : e || (e = {}))[c] = b[c]);
    }
    e && d.extend(!0, a, e);
    return a;
  }
  function db() {
    setTimeout(function() {
      ba = n;
    });
    return ba = d.now();
  }
  function Mb(a, b) {
    d.each(b, function(b, d) {
      for (var f = (ca[b] || []).concat(ca["*"]), g = 0, h = f.length;g < h && !f[g].call(a, b, d);g++) {
      }
    });
  }
  function eb(a, b, c) {
    var e, f = 0, g = da.length, h = d.Deferred().always(function() {
      delete k.elem;
    }), k = function() {
      if (e) {
        return!1;
      }
      for (var b = ba || db(), b = Math.max(0, l.startTime + l.duration - b), c = 1 - (b / l.duration || 0), d = 0, f = l.tweens.length;d < f;d++) {
        l.tweens[d].run(c);
      }
      h.notifyWith(a, [l, c, b]);
      if (1 > c && f) {
        return b;
      }
      h.resolveWith(a, [l]);
      return!1;
    }, l = h.promise({elem:a, props:d.extend({}, b), opts:d.extend(!0, {specialEasing:{}}, c), originalProperties:b, originalOptions:c, startTime:ba || db(), duration:c.duration, tweens:[], createTween:function(b, c) {
      var e = d.Tween(a, l.opts, b, c, l.opts.specialEasing[b] || l.opts.easing);
      l.tweens.push(e);
      return e;
    }, stop:function(b) {
      var c = 0, d = b ? l.tweens.length : 0;
      if (e) {
        return this;
      }
      for (e = !0;c < d;c++) {
        l.tweens[c].run(1);
      }
      b ? h.resolveWith(a, [l, b]) : h.rejectWith(a, [l, b]);
      return this;
    }});
    c = l.props;
    for (Nb(c, l.opts.specialEasing);f < g;f++) {
      if (b = da[f].call(l, a, c, l.opts)) {
        return b;
      }
    }
    Mb(l, c);
    d.isFunction(l.opts.start) && l.opts.start.call(a, l);
    d.fx.timer(d.extend(k, {elem:a, anim:l, queue:l.opts.queue}));
    return l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
  }
  function Nb(a, b) {
    var c, e, f, g, h;
    for (c in a) {
      if (e = d.camelCase(c), f = b[e], g = a[c], d.isArray(g) && (f = g[1], g = a[c] = g[0]), c !== e && (a[e] = g, delete a[c]), (h = d.cssHooks[e]) && "expand" in h) {
        for (c in g = h.expand(g), delete a[e], g) {
          c in a || (a[c] = g[c], b[c] = f);
        }
      } else {
        b[e] = f;
      }
    }
  }
  function z(a, b, c, d, f) {
    return new z.prototype.init(a, b, c, d, f);
  }
  function na(a, b) {
    var c, d = {height:a}, f = 0;
    for (b = b ? 1 : 0;4 > f;f += 2 - b) {
      c = S[f], d["margin" + c] = d["padding" + c] = a;
    }
    b && (d.opacity = d.width = a);
    return d;
  }
  function fb(a) {
    return d.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
  }
  var gb, oa, pa = typeof n, Ob = v.location, t = v.document, hb = t.documentElement, Pb = v.jQuery, Qb = v.$, W = {}, qa = [], ib = qa.concat, Ga = qa.push, T = qa.slice, ma = qa.indexOf, Rb = W.toString, Ha = W.hasOwnProperty, Sb = "2.0.0".trim, d = function(a, b) {
    return new d.fn.init(a, b, gb);
  }, ra = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, M = /\S+/g, Tb = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, jb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Ub = /^-ms-/, Vb = /-([\da-z])/gi, Wb = function(a, b) {
    return b.toUpperCase();
  }, sa = function() {
    t.removeEventListener("DOMContentLoaded", sa, !1);
    v.removeEventListener("load", sa, !1);
    d.ready();
  };
  d.fn = d.prototype = {jquery:"2.0.0", constructor:d, init:function(a, b, c) {
    var e;
    if (!a) {
      return this;
    }
    if ("string" === typeof a) {
      e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : Tb.exec(a);
      if (!e || !e[1] && b) {
        return!b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
      }
      if (e[1]) {
        if (b = b instanceof d ? b[0] : b, d.merge(this, d.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : t, !0)), jb.test(e[1]) && d.isPlainObject(b)) {
          for (e in b) {
            if (d.isFunction(this[e])) {
              this[e](b[e]);
            } else {
              this.attr(e, b[e]);
            }
          }
        }
      } else {
        (b = t.getElementById(e[2])) && b.parentNode && (this.length = 1, this[0] = b), this.context = t, this.selector = a;
      }
      return this;
    }
    if (a.nodeType) {
      return this.context = this[0] = a, this.length = 1, this;
    }
    if (d.isFunction(a)) {
      return c.ready(a);
    }
    a.selector !== n && (this.selector = a.selector, this.context = a.context);
    return d.makeArray(a, this);
  }, selector:"", length:0, toArray:function() {
    return T.call(this);
  }, get:function(a) {
    return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a];
  }, pushStack:function(a) {
    a = d.merge(this.constructor(), a);
    a.prevObject = this;
    a.context = this.context;
    return a;
  }, each:function(a, b) {
    return d.each(this, a, b);
  }, ready:function(a) {
    d.ready.promise().done(a);
    return this;
  }, slice:function() {
    return this.pushStack(T.apply(this, arguments));
  }, first:function() {
    return this.eq(0);
  }, last:function() {
    return this.eq(-1);
  }, eq:function(a) {
    var b = this.length;
    a = +a + (0 > a ? b : 0);
    return this.pushStack(0 <= a && a < b ? [this[a]] : []);
  }, map:function(a) {
    return this.pushStack(d.map(this, function(b, c) {
      return a.call(b, c, b);
    }));
  }, end:function() {
    return this.prevObject || this.constructor(null);
  }, push:Ga, sort:[].sort, splice:[].splice};
  d.fn.init.prototype = d.fn;
  d.extend = d.fn.extend = function() {
    var a, b, c, e, f, g = arguments[0] || {}, h = 1, k = arguments.length, l = !1;
    "boolean" === typeof g && (l = g, g = arguments[1] || {}, h = 2);
    "object" === typeof g || d.isFunction(g) || (g = {});
    k === h && (g = this, --h);
    for (;h < k;h++) {
      if (null != (a = arguments[h])) {
        for (b in a) {
          c = g[b], e = a[b], g !== e && (l && e && (d.isPlainObject(e) || (f = d.isArray(e))) ? (f ? (f = !1, c = c && d.isArray(c) ? c : []) : c = c && d.isPlainObject(c) ? c : {}, g[b] = d.extend(l, c, e)) : e !== n && (g[b] = e));
        }
      }
    }
    return g;
  };
  d.extend({expando:"jQuery" + ("2.0.0" + Math.random()).replace(/\D/g, ""), noConflict:function(a) {
    v.$ === d && (v.$ = Qb);
    a && v.jQuery === d && (v.jQuery = Pb);
    return d;
  }, isReady:!1, readyWait:1, holdReady:function(a) {
    a ? d.readyWait++ : d.ready(!0);
  }, ready:function(a) {
    (!0 === a ? --d.readyWait : d.isReady) || (d.isReady = !0, !0 !== a && 0 < --d.readyWait || (oa.resolveWith(t, [d]), d.fn.trigger && d(t).trigger("ready").off("ready")));
  }, isFunction:function(a) {
    return "function" === d.type(a);
  }, isArray:Array.isArray, isWindow:function(a) {
    return null != a && a === a.window;
  }, isNumeric:function(a) {
    return!isNaN(parseFloat(a)) && isFinite(a);
  }, type:function(a) {
    return null == a ? String(a) : "object" === typeof a || "function" === typeof a ? W[Rb.call(a)] || "object" : typeof a;
  }, isPlainObject:function(a) {
    if ("object" !== d.type(a) || a.nodeType || d.isWindow(a)) {
      return!1;
    }
    try {
      if (a.constructor && !Ha.call(a.constructor.prototype, "isPrototypeOf")) {
        return!1;
      }
    } catch (b) {
      return!1;
    }
    return!0;
  }, isEmptyObject:function(a) {
    for (var b in a) {
      return!1;
    }
    return!0;
  }, error:function(a) {
    throw Error(a);
  }, parseHTML:function(a, b, c) {
    if (!a || "string" !== typeof a) {
      return null;
    }
    "boolean" === typeof b && (c = b, b = !1);
    b = b || t;
    var e = jb.exec(a);
    c = !c && [];
    if (e) {
      return[b.createElement(e[1])];
    }
    e = d.buildFragment([a], b, c);
    c && d(c).remove();
    return d.merge([], e.childNodes);
  }, parseJSON:JSON.parse, parseXML:function(a) {
    var b, c;
    if (!a || "string" !== typeof a) {
      return null;
    }
    try {
      c = new DOMParser, b = c.parseFromString(a, "text/xml");
    } catch (e) {
      b = n;
    }
    b && !b.getElementsByTagName("parsererror").length || d.error("Invalid XML: " + a);
    return b;
  }, noop:function() {
  }, globalEval:function(a) {
    var b;
    b = eval;
    if (a = d.trim(a)) {
      1 === a.indexOf("use strict") ? (b = t.createElement("script"), b.text = a, t.head.appendChild(b).parentNode.removeChild(b)) : b(a);
    }
  }, camelCase:function(a) {
    return a.replace(Ub, "ms-").replace(Vb, Wb);
  }, nodeName:function(a, b) {
    return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
  }, each:function(a, b, c) {
    var d, f = 0, g = a.length;
    d = ua(a);
    if (c) {
      if (d) {
        for (;f < g && (d = b.apply(a[f], c), !1 !== d);f++) {
        }
      } else {
        for (f in a) {
          if (d = b.apply(a[f], c), !1 === d) {
            break;
          }
        }
      }
    } else {
      if (d) {
        for (;f < g && (d = b.call(a[f], f, a[f]), !1 !== d);f++) {
        }
      } else {
        for (f in a) {
          if (d = b.call(a[f], f, a[f]), !1 === d) {
            break;
          }
        }
      }
    }
    return a;
  }, trim:function(a) {
    return null == a ? "" : Sb.call(a);
  }, makeArray:function(a, b) {
    var c = b || [];
    null != a && (ua(Object(a)) ? d.merge(c, "string" === typeof a ? [a] : a) : Ga.call(c, a));
    return c;
  }, inArray:function(a, b, c) {
    return null == b ? -1 : ma.call(b, a, c);
  }, merge:function(a, b) {
    var c = b.length, d = a.length, f = 0;
    if ("number" === typeof c) {
      for (;f < c;f++) {
        a[d++] = b[f];
      }
    } else {
      for (;b[f] !== n;) {
        a[d++] = b[f++];
      }
    }
    a.length = d;
    return a;
  }, grep:function(a, b, c) {
    var d, f = [], g = 0, h = a.length;
    for (c = !!c;g < h;g++) {
      d = !!b(a[g], g), c !== d && f.push(a[g]);
    }
    return f;
  }, map:function(a, b, c) {
    var d, f = 0, g = a.length, h = [];
    if (ua(a)) {
      for (;f < g;f++) {
        d = b(a[f], f, c), null != d && (h[h.length] = d);
      }
    } else {
      for (f in a) {
        d = b(a[f], f, c), null != d && (h[h.length] = d);
      }
    }
    return ib.apply([], h);
  }, guid:1, proxy:function(a, b) {
    var c, e;
    "string" === typeof b && (c = a[b], b = a, a = c);
    if (!d.isFunction(a)) {
      return n;
    }
    e = T.call(arguments, 2);
    c = function() {
      return a.apply(b || this, e.concat(T.call(arguments)));
    };
    c.guid = a.guid = a.guid || d.guid++;
    return c;
  }, access:function(a, b, c, e, f, g, h) {
    var k = 0, l = a.length, q = null == c;
    if ("object" === d.type(c)) {
      for (k in f = !0, c) {
        d.access(a, b, k, c[k], !0, g, h);
      }
    } else {
      if (e !== n && (f = !0, d.isFunction(e) || (h = !0), q && (h ? (b.call(a, e), b = null) : (q = b, b = function(a, b, c) {
        return q.call(d(a), c);
      })), b)) {
        for (;k < l;k++) {
          b(a[k], c, h ? e : e.call(a[k], k, b(a[k], c)));
        }
      }
    }
    return f ? a : q ? b.call(a) : l ? b(a[0], c) : g;
  }, now:Date.now, swap:function(a, b, c, d) {
    var f, g = {};
    for (f in b) {
      g[f] = a.style[f], a.style[f] = b[f];
    }
    c = c.apply(a, d || []);
    for (f in b) {
      a.style[f] = g[f];
    }
    return c;
  }});
  d.ready.promise = function(a) {
    oa || (oa = d.Deferred(), "complete" === t.readyState ? setTimeout(d.ready) : (t.addEventListener("DOMContentLoaded", sa, !1), v.addEventListener("load", sa, !1)));
    return oa.promise(a);
  };
  d.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
    W["[object " + b + "]"] = b.toLowerCase();
  });
  gb = d(t);
  (function(a, b) {
    function c(a) {
      return qa.test(a + "");
    }
    function e() {
      var a, b = [];
      return a = function(c, d) {
        b.push(c += " ") > w.cacheLength && delete a[b.shift()];
        return a[c] = d;
      };
    }
    function f(a) {
      a[E] = !0;
      return a;
    }
    function g(a) {
      var b = D.createElement("div");
      try {
        return!!a(b);
      } catch (c) {
        return!1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b);
      }
    }
    function h(a, b, c, d) {
      var e, f, g, h, k;
      (b ? b.ownerDocument || b : J) !== D && K(b);
      b = b || D;
      c = c || [];
      if (!a || "string" !== typeof a) {
        return c;
      }
      if (1 !== (h = b.nodeType) && 9 !== h) {
        return[];
      }
      if (L && !d) {
        if (e = ra.exec(a)) {
          if (g = e[1]) {
            if (9 === h) {
              if ((f = b.getElementById(g)) && f.parentNode) {
                if (f.id === g) {
                  return c.push(f), c;
                }
              } else {
                return c;
              }
            } else {
              if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && wa(b, f) && f.id === g) {
                return c.push(f), c;
              }
            }
          } else {
            if (e[2]) {
              return ea.apply(c, b.getElementsByTagName(a)), c;
            }
            if ((g = e[3]) && A.getElementsByClassName && b.getElementsByClassName) {
              return ea.apply(c, b.getElementsByClassName(g)), c;
            }
          }
        }
        if (A.qsa && (!H || !H.test(a))) {
          f = e = E;
          g = b;
          k = 9 === h && a;
          if (1 === h && "object" !== b.nodeName.toLowerCase()) {
            h = B(a);
            (e = b.getAttribute("id")) ? f = e.replace(ua, "\\$&") : b.setAttribute("id", f);
            f = "[id='" + f + "'] ";
            for (g = h.length;g--;) {
              h[g] = f + p(h[g]);
            }
            g = da.test(a) && b.parentNode || b;
            k = h.join(",");
          }
          if (k) {
            try {
              return ea.apply(c, g.querySelectorAll(k)), c;
            } catch (l) {
            } finally {
              e || b.removeAttribute("id");
            }
          }
        }
      }
      var m;
      a: {
        a = a.replace(V, "$1");
        f = B(a);
        if (!d && 1 === f.length) {
          e = f[0] = f[0].slice(0);
          if (2 < e.length && "ID" === (m = e[0]).type && 9 === b.nodeType && L && w.relative[e[1].type]) {
            b = (w.find.ID(m.matches[0].replace(fa, ga), b) || [])[0];
            if (!b) {
              m = c;
              break a;
            }
            a = a.slice(e.shift().value.length);
          }
          for (h = W.needsContext.test(a) ? 0 : e.length;h--;) {
            m = e[h];
            if (w.relative[g = m.type]) {
              break;
            }
            if (g = w.find[g]) {
              if (d = g(m.matches[0].replace(fa, ga), da.test(e[0].type) && b.parentNode || b)) {
                e.splice(h, 1);
                a = d.length && p(e);
                if (!a) {
                  ea.apply(c, d);
                  m = c;
                  break a;
                }
                break;
              }
            }
          }
        }
        M(a, f)(d, b, !L, c, da.test(a));
        m = c;
      }
      return m;
    }
    function k(a, b) {
      var c = b && a, d = c && (~b.sourceIndex || -2147483648) - (~a.sourceIndex || -2147483648);
      if (d) {
        return d;
      }
      if (c) {
        for (;c = c.nextSibling;) {
          if (c === b) {
            return-1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function l(a, c, d) {
      var e;
      return d ? b : (e = a.getAttributeNode(c)) && e.specified ? e.value : !0 === a[c] ? c.toLowerCase() : null;
    }
    function q(a, c, d) {
      return d ? b : a.getAttribute(c, "type" === c.toLowerCase() ? 1 : 2);
    }
    function n(a) {
      return function(b) {
        return "input" === b.nodeName.toLowerCase() && b.type === a;
      };
    }
    function m(a) {
      return function(b) {
        var c = b.nodeName.toLowerCase();
        return("input" === c || "button" === c) && b.type === a;
      };
    }
    function u(a) {
      return f(function(b) {
        b = +b;
        return f(function(c, d) {
          for (var e, f = a([], c.length, b), g = f.length;g--;) {
            c[e = f[g]] && (c[e] = !(d[e] = c[e]));
          }
        });
      });
    }
    function B(a, b) {
      var c, d, e, f, g, k, l;
      if (g = S[a + " "]) {
        return b ? 0 : g.slice(0);
      }
      g = a;
      k = [];
      for (l = w.preFilter;g;) {
        if (!c || (d = la.exec(g))) {
          d && (g = g.slice(d[0].length) || g), k.push(e = []);
        }
        c = !1;
        if (d = ma.exec(g)) {
          c = d.shift(), e.push({value:c, type:d[0].replace(V, " ")}), g = g.slice(c.length);
        }
        for (f in w.filter) {
          !(d = W[f].exec(g)) || l[f] && !(d = l[f](d)) || (c = d.shift(), e.push({value:c, type:f, matches:d}), g = g.slice(c.length));
        }
        if (!c) {
          break;
        }
      }
      return b ? g.length : g ? h.error(a) : S(a, k).slice(0);
    }
    function p(a) {
      for (var b = 0, c = a.length, d = "";b < c;b++) {
        d += a[b].value;
      }
      return d;
    }
    function t(a, b, c) {
      var d = b.dir, e = c && "parentNode" === d, f = P++;
      return b.first ? function(b, c, f) {
        for (;b = b[d];) {
          if (1 === b.nodeType || e) {
            return a(b, c, f);
          }
        }
      } : function(b, c, g) {
        var h, k, Ia, l = U + " " + f;
        if (g) {
          for (;b = b[d];) {
            if ((1 === b.nodeType || e) && a(b, c, g)) {
              return!0;
            }
          }
        } else {
          for (;b = b[d];) {
            if (1 === b.nodeType || e) {
              if (Ia = b[E] || (b[E] = {}), (k = Ia[d]) && k[0] === l) {
                if (!0 === (h = k[1]) || h === ya) {
                  return!0 === h;
                }
              } else {
                if (k = Ia[d] = [l], k[1] = a(b, c, g) || ya, !0 === k[1]) {
                  return!0;
                }
              }
            }
          }
        }
      };
    }
    function v(a) {
      return 1 < a.length ? function(b, c, d) {
        for (var e = a.length;e--;) {
          if (!a[e](b, c, d)) {
            return!1;
          }
        }
        return!0;
      } : a[0];
    }
    function y(a, b, c, d, e) {
      for (var f, g = [], h = 0, k = a.length, l = null != b;h < k;h++) {
        if (f = a[h]) {
          if (!c || c(f, d, e)) {
            g.push(f), l && b.push(h);
          }
        }
      }
      return g;
    }
    function z(a, b, c, d, e, g) {
      d && !d[E] && (d = z(d));
      e && !e[E] && (e = z(e, g));
      return f(function(f, g, k, l) {
        var m, q, n = [], r = [], u = g.length, w;
        if (!(w = f)) {
          w = b || "*";
          for (var p = k.nodeType ? [k] : k, B = [], va = 0, x = p.length;va < x;va++) {
            h(w, p[va], B);
          }
          w = B;
        }
        w = !a || !f && b ? w : y(w, n, a, k, l);
        p = c ? e || (f ? a : u || d) ? [] : g : w;
        c && c(w, p, k, l);
        if (d) {
          for (m = y(p, r), d(m, [], k, l), k = m.length;k--;) {
            if (q = m[k]) {
              p[r[k]] = !(w[r[k]] = q);
            }
          }
        }
        if (f) {
          if (e || a) {
            if (e) {
              m = [];
              for (k = p.length;k--;) {
                (q = p[k]) && m.push(w[k] = q);
              }
              e(null, p = [], m, l);
            }
            for (k = p.length;k--;) {
              (q = p[k]) && -1 < (m = e ? ia.call(f, q) : n[k]) && (f[m] = !(g[m] = q));
            }
          }
        } else {
          p = y(p === g ? p.splice(u, p.length) : p), e ? e(null, g, p, l) : ea.apply(g, p);
        }
      });
    }
    function N(a) {
      var b, c, d, e = a.length, f = w.relative[a[0].type];
      c = f || w.relative[" "];
      for (var g = f ? 1 : 0, h = t(function(a) {
        return a === b;
      }, c, !0), k = t(function(a) {
        return-1 < ia.call(b, a);
      }, c, !0), l = [function(a, c, d) {
        return!f && (d || c !== za) || ((b = c).nodeType ? h(a, c, d) : k(a, c, d));
      }];g < e;g++) {
        if (c = w.relative[a[g].type]) {
          l = [t(v(l), c)];
        } else {
          c = w.filter[a[g].type].apply(null, a[g].matches);
          if (c[E]) {
            for (d = ++g;d < e && !w.relative[a[d].type];d++) {
            }
            return z(1 < g && v(l), 1 < g && p(a.slice(0, g - 1)).replace(V, "$1"), c, g < d && N(a.slice(g, d)), d < e && N(a = a.slice(d)), d < e && p(a));
          }
          l.push(c);
        }
      }
      return v(l);
    }
    function C(a, b) {
      var c = 0, d = 0 < b.length, e = 0 < a.length, g = function(f, g, k, l, m) {
        var q, n, r = [], p = 0, u = "0", B = f && [], x = null != m, t = za, va = f || e && w.find.TAG("*", m && g.parentNode || g), v = U += null == t ? 1 : Math.random() || .1;
        x && (za = g !== D && g, ya = c);
        for (;null != (m = va[u]);u++) {
          if (e && m) {
            for (q = 0;n = a[q++];) {
              if (n(m, g, k)) {
                l.push(m);
                break;
              }
            }
            x && (U = v, ya = ++c);
          }
          d && ((m = !n && m) && p--, f && B.push(m));
        }
        p += u;
        if (d && u !== p) {
          for (q = 0;n = b[q++];) {
            n(B, r, g, k);
          }
          if (f) {
            if (0 < p) {
              for (;u--;) {
                B[u] || r[u] || (r[u] = Z.call(l));
              }
            }
            r = y(r);
          }
          ea.apply(l, r);
          x && !f && 0 < r.length && 1 < p + b.length && h.uniqueSort(l);
        }
        x && (U = v, za = t);
        return B;
      };
      return d ? f(g) : g;
    }
    function x() {
    }
    var G, ya, w, Aa, kb, M, za, ja, K, D, I, L, H, F, Ba, wa, E = "sizzle" + -new Date, J = a.document, A = {}, U = 0, P = 0, R = e(), S = e(), T = e(), Q = !1, O = function() {
      return 0;
    }, ka = typeof b, ha = [], Z = ha.pop, ba = ha.push, ea = ha.push, Y = ha.slice, ia = ha.indexOf || function(a) {
      for (var b = 0, c = this.length;b < c;b++) {
        if (this[b] === a) {
          return b;
        }
      }
      return-1;
    }, aa = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"), ca = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + aa + ")|)|)[\\x20\\t\\r\\n\\f]*\\]", X = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ca.replace(3, 8) + ")*)|.*)\\)|)", V = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"), la = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, 
    ma = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/, da = /[\x20\t\r\n\f]*[+~]/, na = RegExp("=[\\x20\\t\\r\\n\\f]*([^\\]'\"]*)[\\x20\\t\\r\\n\\f]*\\]", "g"), oa = new RegExp(X), pa = new RegExp("^" + aa + "$"), W = {ID:/^#((?:\\.|[\w-]|[^\x00-\xa0])+)/, CLASS:/^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/, TAG:new RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"), ATTR:new RegExp("^" + ca), PSEUDO:new RegExp("^" + X), CHILD:/^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i, 
    "boolean":/^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i, needsContext:/^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i}, qa = /^[^{]+\{\s*\[native \w/, ra = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, sa = /^(?:input|select|textarea|button)$/i, ta = /^h\d$/i, ua = /'|\\/g, fa = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, ga = function(a, b) {
      var c = "0x" + b - 65536;
      return c !== c ? b : 0 > c ? String.fromCharCode(c + 65536) : String.fromCharCode(c >> 10 | 55296, c & 1023 | 56320);
    };
    try {
      ea.apply(ha = Y.call(J.childNodes), J.childNodes), ha[J.childNodes.length].nodeType;
    } catch (xa) {
      ea = {apply:ha.length ? function(a, b) {
        ba.apply(a, Y.call(b));
      } : function(a, b) {
        for (var c = a.length, d = 0;a[c++] = b[d++];) {
        }
        a.length = c - 1;
      }};
    }
    kb = h.isXML = function(a) {
      return(a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1;
    };
    K = h.setDocument = function(a) {
      var d = a ? a.ownerDocument || a : J;
      if (d === D || 9 !== d.nodeType || !d.documentElement) {
        return D;
      }
      D = d;
      I = d.documentElement;
      L = !kb(d);
      A.getElementsByTagName = g(function(a) {
        a.appendChild(d.createComment(""));
        return!a.getElementsByTagName("*").length;
      });
      A.attributes = g(function(a) {
        a.className = "i";
        return!a.getAttribute("className");
      });
      A.getElementsByClassName = g(function(a) {
        a.innerHTML = "<div class='a'></div><div class='a i'></div>";
        a.firstChild.className = "i";
        return 2 === a.getElementsByClassName("i").length;
      });
      A.sortDetached = g(function(a) {
        return a.compareDocumentPosition(D.createElement("div")) & 1;
      });
      A.getById = g(function(a) {
        I.appendChild(a).id = E;
        return!d.getElementsByName || !d.getElementsByName(E).length;
      });
      A.getById ? (w.find.ID = function(a, b) {
        if (typeof b.getElementById !== ka && L) {
          var c = b.getElementById(a);
          return c && c.parentNode ? [c] : [];
        }
      }, w.filter.ID = function(a) {
        var b = a.replace(fa, ga);
        return function(a) {
          return a.getAttribute("id") === b;
        };
      }) : (w.find.ID = function(a, c) {
        if (typeof c.getElementById !== ka && L) {
          var d = c.getElementById(a);
          return d ? d.id === a || typeof d.getAttributeNode !== ka && d.getAttributeNode("id").value === a ? [d] : b : [];
        }
      }, w.filter.ID = function(a) {
        var b = a.replace(fa, ga);
        return function(a) {
          return(a = typeof a.getAttributeNode !== ka && a.getAttributeNode("id")) && a.value === b;
        };
      });
      w.find.TAG = A.getElementsByTagName ? function(a, b) {
        if (typeof b.getElementsByTagName !== ka) {
          return b.getElementsByTagName(a);
        }
      } : function(a, b) {
        var c, d = [], e = 0, f = b.getElementsByTagName(a);
        if ("*" === a) {
          for (;c = f[e++];) {
            1 === c.nodeType && d.push(c);
          }
          return d;
        }
        return f;
      };
      w.find.CLASS = A.getElementsByClassName && function(a, b) {
        if (typeof b.getElementsByClassName !== ka && L) {
          return b.getElementsByClassName(a);
        }
      };
      F = [];
      H = [];
      if (A.qsa = c(d.querySelectorAll)) {
        g(function(a) {
          a.innerHTML = "<select><option selected=''></option></select>";
          a.querySelectorAll("[selected]").length || H.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
          a.querySelectorAll(":checked").length || H.push(":checked");
        }), g(function(a) {
          var b = D.createElement("input");
          b.setAttribute("type", "hidden");
          a.appendChild(b).setAttribute("t", "");
          a.querySelectorAll("[t^='']").length && H.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
          a.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled");
          a.querySelectorAll("*,:x");
          H.push(",.*:");
        });
      }
      (A.matchesSelector = c(Ba = I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && g(function(a) {
        A.disconnectedMatch = Ba.call(a, "div");
        Ba.call(a, "[s!='']:x");
        F.push("!=", X);
      });
      H = H.length && new RegExp(H.join("|"));
      F = F.length && new RegExp(F.join("|"));
      wa = c(I.contains) || I.compareDocumentPosition ? function(a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
        return a === d || !!(d && 1 === d.nodeType && (c.contains ? c.contains(d) : a.compareDocumentPosition && a.compareDocumentPosition(d) & 16));
      } : function(a, b) {
        if (b) {
          for (;b = b.parentNode;) {
            if (b === a) {
              return!0;
            }
          }
        }
        return!1;
      };
      O = I.compareDocumentPosition ? function(a, b) {
        if (a === b) {
          return Q = !0, 0;
        }
        var c = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
        return c ? c & 1 || !A.sortDetached && b.compareDocumentPosition(a) === c ? a === d || wa(J, a) ? -1 : b === d || wa(J, b) ? 1 : ja ? ia.call(ja, a) - ia.call(ja, b) : 0 : c & 4 ? -1 : 1 : a.compareDocumentPosition ? -1 : 1;
      } : function(a, b) {
        var c, e = 0;
        c = a.parentNode;
        var f = b.parentNode, g = [a], h = [b];
        if (a === b) {
          return Q = !0, 0;
        }
        if (!c || !f) {
          return a === d ? -1 : b === d ? 1 : c ? -1 : f ? 1 : ja ? ia.call(ja, a) - ia.call(ja, b) : 0;
        }
        if (c === f) {
          return k(a, b);
        }
        for (c = a;c = c.parentNode;) {
          g.unshift(c);
        }
        for (c = b;c = c.parentNode;) {
          h.unshift(c);
        }
        for (;g[e] === h[e];) {
          e++;
        }
        return e ? k(g[e], h[e]) : g[e] === J ? -1 : h[e] === J ? 1 : 0;
      };
      return D;
    };
    h.matches = function(a, b) {
      return h(a, null, null, b);
    };
    h.matchesSelector = function(a, b) {
      (a.ownerDocument || a) !== D && K(a);
      b = b.replace(na, "='$1']");
      if (!(!A.matchesSelector || !L || F && F.test(b) || H && H.test(b))) {
        try {
          var c = Ba.call(a, b);
          if (c || A.disconnectedMatch || a.document && 11 !== a.document.nodeType) {
            return c;
          }
        } catch (d) {
        }
      }
      return 0 < h(b, D, null, [a]).length;
    };
    h.contains = function(a, b) {
      (a.ownerDocument || a) !== D && K(a);
      return wa(a, b);
    };
    h.attr = function(a, c) {
      (a.ownerDocument || a) !== D && K(a);
      var d = w.attrHandle[c.toLowerCase()], d = d && d(a, c, !L);
      return d === b ? A.attributes || !L ? a.getAttribute(c) : (d = a.getAttributeNode(c)) && d.specified ? d.value : null : d;
    };
    h.error = function(a) {
      throw Error("Syntax error, unrecognized expression: " + a);
    };
    h.uniqueSort = function(a) {
      var b, c = [], d = 0, e = 0;
      Q = !A.detectDuplicates;
      ja = !A.sortStable && a.slice(0);
      a.sort(O);
      if (Q) {
        for (;b = a[e++];) {
          b === a[e] && (d = c.push(e));
        }
        for (;d--;) {
          a.splice(c[d], 1);
        }
      }
      return a;
    };
    Aa = h.getText = function(a) {
      var b, c = "", d = 0;
      b = a.nodeType;
      if (!b) {
        for (;b = a[d];d++) {
          c += Aa(b);
        }
      } else {
        if (1 === b || 9 === b || 11 === b) {
          if ("string" === typeof a.textContent) {
            return a.textContent;
          }
          for (a = a.firstChild;a;a = a.nextSibling) {
            c += Aa(a);
          }
        } else {
          if (3 === b || 4 === b) {
            return a.nodeValue;
          }
        }
      }
      return c;
    };
    w = h.selectors = {cacheLength:50, createPseudo:f, match:W, attrHandle:{}, find:{}, relative:{">":{dir:"parentNode", first:!0}, " ":{dir:"parentNode"}, "+":{dir:"previousSibling", first:!0}, "~":{dir:"previousSibling"}}, preFilter:{ATTR:function(a) {
      a[1] = a[1].replace(fa, ga);
      a[3] = (a[4] || a[5] || "").replace(fa, ga);
      "~=" === a[2] && (a[3] = " " + a[3] + " ");
      return a.slice(0, 4);
    }, CHILD:function(a) {
      a[1] = a[1].toLowerCase();
      "nth" === a[1].slice(0, 3) ? (a[3] || h.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && h.error(a[0]);
      return a;
    }, PSEUDO:function(a) {
      var b, c = !a[5] && a[2];
      if (W.CHILD.test(a[0])) {
        return null;
      }
      a[4] ? a[2] = a[4] : c && oa.test(c) && (b = B(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b));
      return a.slice(0, 3);
    }}, filter:{TAG:function(a) {
      var b = a.replace(fa, ga).toLowerCase();
      return "*" === a ? function() {
        return!0;
      } : function(a) {
        return a.nodeName && a.nodeName.toLowerCase() === b;
      };
    }, CLASS:function(a) {
      var b = R[a + " "];
      return b || (b = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)")) && R(a, function(a) {
        return b.test("string" === typeof a.className && a.className || typeof a.getAttribute !== ka && a.getAttribute("class") || "");
      });
    }, ATTR:function(a, b, c) {
      return function(d) {
        d = h.attr(d, a);
        if (null == d) {
          return "!=" === b;
        }
        if (!b) {
          return!0;
        }
        d += "";
        return "=" === b ? d === c : "!=" === b ? d !== c : "^=" === b ? c && 0 === d.indexOf(c) : "*=" === b ? c && -1 < d.indexOf(c) : "$=" === b ? c && d.slice(-c.length) === c : "~=" === b ? -1 < (" " + d + " ").indexOf(c) : "|=" === b ? d === c || d.slice(0, c.length + 1) === c + "-" : !1;
      };
    }, CHILD:function(a, b, c, d, e) {
      var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
      return 1 === d && 0 === e ? function(a) {
        return!!a.parentNode;
      } : function(b, c, k) {
        var l, m, q, n, r;
        c = f !== g ? "nextSibling" : "previousSibling";
        var p = b.parentNode, u = h && b.nodeName.toLowerCase();
        k = !k && !h;
        if (p) {
          if (f) {
            for (;c;) {
              for (m = b;m = m[c];) {
                if (h ? m.nodeName.toLowerCase() === u : 1 === m.nodeType) {
                  return!1;
                }
              }
              r = c = "only" === a && !r && "nextSibling";
            }
            return!0;
          }
          r = [g ? p.firstChild : p.lastChild];
          if (g && k) {
            for (k = p[E] || (p[E] = {}), l = k[a] || [], n = l[0] === U && l[1], q = l[0] === U && l[2], m = n && p.childNodes[n];m = ++n && m && m[c] || (q = n = 0) || r.pop();) {
              if (1 === m.nodeType && ++q && m === b) {
                k[a] = [U, n, q];
                break;
              }
            }
          } else {
            if (k && (l = (b[E] || (b[E] = {}))[a]) && l[0] === U) {
              q = l[1];
            } else {
              for (;(m = ++n && m && m[c] || (q = n = 0) || r.pop()) && ((h ? m.nodeName.toLowerCase() !== u : 1 !== m.nodeType) || !++q || (k && ((m[E] || (m[E] = {}))[a] = [U, q]), m !== b));) {
              }
            }
          }
          q -= e;
          return q === d || 0 === q % d && 0 <= q / d;
        }
      };
    }, PSEUDO:function(a, b) {
      var c, d = w.pseudos[a] || w.setFilters[a.toLowerCase()] || h.error("unsupported pseudo: " + a);
      return d[E] ? d(b) : 1 < d.length ? (c = [a, a, "", b], w.setFilters.hasOwnProperty(a.toLowerCase()) ? f(function(a, c) {
        for (var e, f = d(a, b), g = f.length;g--;) {
          e = ia.call(a, f[g]), a[e] = !(c[e] = f[g]);
        }
      }) : function(a) {
        return d(a, 0, c);
      }) : d;
    }}, pseudos:{not:f(function(a) {
      var b = [], c = [], d = M(a.replace(V, "$1"));
      return d[E] ? f(function(a, b, c, e) {
        e = d(a, null, e, []);
        for (var f = a.length;f--;) {
          if (c = e[f]) {
            a[f] = !(b[f] = c);
          }
        }
      }) : function(a, e, f) {
        b[0] = a;
        d(b, null, f, c);
        return!c.pop();
      };
    }), has:f(function(a) {
      return function(b) {
        return 0 < h(a, b).length;
      };
    }), contains:f(function(a) {
      return function(b) {
        return-1 < (b.textContent || b.innerText || Aa(b)).indexOf(a);
      };
    }), lang:f(function(a) {
      pa.test(a || "") || h.error("unsupported lang: " + a);
      a = a.replace(fa, ga).toLowerCase();
      return function(b) {
        var c;
        do {
          if (c = L ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) {
            return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
          }
        } while ((b = b.parentNode) && 1 === b.nodeType);
        return!1;
      };
    }), target:function(b) {
      var c = a.location && a.location.hash;
      return c && c.slice(1) === b.id;
    }, root:function(a) {
      return a === I;
    }, focus:function(a) {
      return a === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
    }, enabled:function(a) {
      return!1 === a.disabled;
    }, disabled:function(a) {
      return!0 === a.disabled;
    }, checked:function(a) {
      var b = a.nodeName.toLowerCase();
      return "input" === b && !!a.checked || "option" === b && !!a.selected;
    }, selected:function(a) {
      a.parentNode && a.parentNode.selectedIndex;
      return!0 === a.selected;
    }, empty:function(a) {
      for (a = a.firstChild;a;a = a.nextSibling) {
        if ("@" < a.nodeName || 3 === a.nodeType || 4 === a.nodeType) {
          return!1;
        }
      }
      return!0;
    }, parent:function(a) {
      return!w.pseudos.empty(a);
    }, header:function(a) {
      return ta.test(a.nodeName);
    }, input:function(a) {
      return sa.test(a.nodeName);
    }, button:function(a) {
      var b = a.nodeName.toLowerCase();
      return "input" === b && "button" === a.type || "button" === b;
    }, text:function(a) {
      var b;
      return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type);
    }, first:u(function() {
      return[0];
    }), last:u(function(a, b) {
      return[b - 1];
    }), eq:u(function(a, b, c) {
      return[0 > c ? c + b : c];
    }), even:u(function(a, b) {
      for (var c = 0;c < b;c += 2) {
        a.push(c);
      }
      return a;
    }), odd:u(function(a, b) {
      for (var c = 1;c < b;c += 2) {
        a.push(c);
      }
      return a;
    }), lt:u(function(a, b, c) {
      for (b = 0 > c ? c + b : c;0 <= --b;) {
        a.push(b);
      }
      return a;
    }), gt:u(function(a, b, c) {
      for (c = 0 > c ? c + b : c;++c < b;) {
        a.push(c);
      }
      return a;
    })}};
    for (G in{radio:!0, checkbox:!0, file:!0, password:!0, image:!0}) {
      w.pseudos[G] = n(G);
    }
    for (G in{submit:!0, reset:!0}) {
      w.pseudos[G] = m(G);
    }
    M = h.compile = function(a, b) {
      var c, d = [], e = [], f = T[a + " "];
      if (!f) {
        b || (b = B(a));
        for (c = b.length;c--;) {
          f = N(b[c]), f[E] ? d.push(f) : e.push(f);
        }
        f = T(a, C(e, d));
      }
      return f;
    };
    w.pseudos.nth = w.pseudos.eq;
    x.prototype = w.filters = w.pseudos;
    w.setFilters = new x;
    A.sortStable = E.split("").sort(O).join("") === E;
    K();
    [0, 0].sort(O);
    A.detectDuplicates = Q;
    g(function(a) {
      a.innerHTML = "<a href='#'></a>";
      if ("#" !== a.firstChild.getAttribute("href")) {
        a = ["type", "href", "height", "width"];
        for (var b = a.length;b--;) {
          w.attrHandle[a[b]] = q;
        }
      }
    });
    g(function(a) {
      if (null != a.getAttribute("disabled")) {
        a = "checked selected async autofocus autoplay controls defer disabled hidden ismap loop multiple open readonly required scoped".split(" ");
        for (var b = a.length;b--;) {
          w.attrHandle[a[b]] = l;
        }
      }
    });
    d.find = h;
    d.expr = h.selectors;
    d.expr[":"] = d.expr.pseudos;
    d.unique = h.uniqueSort;
    d.text = h.getText;
    d.isXMLDoc = h.isXML;
    d.contains = h.contains;
  })(v);
  var Na = {};
  d.Callbacks = function(a) {
    a = "string" === typeof a ? Na[a] || Cb(a) : d.extend({}, a);
    var b, c, e, f, g, h, k = [], l = !a.once && [], q = function(d) {
      b = a.memory && d;
      c = !0;
      h = f || 0;
      f = 0;
      g = k.length;
      for (e = !0;k && h < g;h++) {
        if (!1 === k[h].apply(d[0], d[1]) && a.stopOnFalse) {
          b = !1;
          break;
        }
      }
      e = !1;
      k && (l ? l.length && q(l.shift()) : b ? k = [] : r.disable());
    }, r = {add:function() {
      if (k) {
        var c = k.length;
        (function B(b) {
          d.each(b, function(b, c) {
            var e = d.type(c);
            "function" === e ? a.unique && r.has(c) || k.push(c) : c && c.length && "string" !== e && B(c);
          });
        })(arguments);
        e ? g = k.length : b && (f = c, q(b));
      }
      return this;
    }, remove:function() {
      k && d.each(arguments, function(a, b) {
        for (var c;-1 < (c = d.inArray(b, k, c));) {
          k.splice(c, 1), e && (c <= g && g--, c <= h && h--);
        }
      });
      return this;
    }, has:function(a) {
      return a ? -1 < d.inArray(a, k) : !(!k || !k.length);
    }, empty:function() {
      k = [];
      g = 0;
      return this;
    }, disable:function() {
      k = l = b = n;
      return this;
    }, disabled:function() {
      return!k;
    }, lock:function() {
      l = n;
      b || r.disable();
      return this;
    }, locked:function() {
      return!l;
    }, fireWith:function(a, b) {
      b = b || [];
      b = [a, b.slice ? b.slice() : b];
      !k || c && !l || (e ? l.push(b) : q(b));
      return this;
    }, fire:function() {
      r.fireWith(this, arguments);
      return this;
    }, fired:function() {
      return!!c;
    }};
    return r;
  };
  d.extend({Deferred:function(a) {
    var b = [["resolve", "done", d.Callbacks("once memory"), "resolved"], ["reject", "fail", d.Callbacks("once memory"), "rejected"], ["notify", "progress", d.Callbacks("memory")]], c = "pending", e = {state:function() {
      return c;
    }, always:function() {
      f.done(arguments).fail(arguments);
      return this;
    }, then:function() {
      var a = arguments;
      return d.Deferred(function(c) {
        d.each(b, function(b, l) {
          var q = l[0], n = d.isFunction(a[b]) && a[b];
          f[l[1]](function() {
            var a = n && n.apply(this, arguments);
            if (a && d.isFunction(a.promise)) {
              a.promise().done(c.resolve).fail(c.reject).progress(c.notify);
            } else {
              c[q + "With"](this === e ? c.promise() : this, n ? [a] : arguments);
            }
          });
        });
        a = null;
      }).promise();
    }, promise:function(a) {
      return null != a ? d.extend(a, e) : e;
    }}, f = {};
    e.pipe = e.then;
    d.each(b, function(a, d) {
      var k = d[2], l = d[3];
      e[d[1]] = k.add;
      l && k.add(function() {
        c = l;
      }, b[a ^ 1][2].disable, b[2][2].lock);
      f[d[0]] = function() {
        f[d[0] + "With"](this === f ? e : this, arguments);
        return this;
      };
      f[d[0] + "With"] = k.fireWith;
    });
    e.promise(f);
    a && a.call(f, f);
    return f;
  }, when:function(a) {
    var b = 0, c = T.call(arguments), e = c.length, f = 1 !== e || a && d.isFunction(a.promise) ? e : 0, g = 1 === f ? a : d.Deferred(), h = function(a, b, c) {
      return function(d) {
        b[a] = this;
        c[a] = 1 < arguments.length ? T.call(arguments) : d;
        c === k ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
      };
    }, k, l, q;
    if (1 < e) {
      for (k = Array(e), l = Array(e), q = Array(e);b < e;b++) {
        c[b] && d.isFunction(c[b].promise) ? c[b].promise().done(h(b, q, c)).fail(g.reject).progress(h(b, l, k)) : --f;
      }
    }
    f || g.resolveWith(q, c);
    return g.promise();
  }});
  d.support = function(a) {
    var b = t.createElement("input"), c = t.createDocumentFragment(), e = t.createElement("div"), f = t.createElement("select"), g = f.appendChild(t.createElement("option"));
    if (!b.type) {
      return a;
    }
    b.type = "checkbox";
    a.checkOn = "" !== b.value;
    a.optSelected = g.selected;
    a.reliableMarginRight = !0;
    a.boxSizingReliable = !0;
    a.pixelPosition = !1;
    b.checked = !0;
    a.noCloneChecked = b.cloneNode(!0).checked;
    f.disabled = !0;
    a.optDisabled = !g.disabled;
    b = t.createElement("input");
    b.value = "t";
    b.type = "radio";
    a.radioValue = "t" === b.value;
    b.setAttribute("checked", "t");
    b.setAttribute("name", "t");
    c.appendChild(b);
    a.checkClone = c.cloneNode(!0).cloneNode(!0).lastChild.checked;
    a.focusinBubbles = "onfocusin" in v;
    e.style.backgroundClip = "content-box";
    e.cloneNode(!0).style.backgroundClip = "";
    a.clearCloneStyle = "content-box" === e.style.backgroundClip;
    d(function() {
      var b, c, f = t.getElementsByTagName("body")[0];
      f && (b = t.createElement("div"), b.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", f.appendChild(b).appendChild(e), e.innerHTML = "", e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", d.swap(f, null != f.style.zoom ? {zoom:1} : {}, function() {
        a.boxSizing = 4 === e.offsetWidth;
      }), v.getComputedStyle && (a.pixelPosition = "1%" !== (v.getComputedStyle(e, null) || {}).top, a.boxSizingReliable = "4px" === (v.getComputedStyle(e, null) || {width:"4px"}).width, c = e.appendChild(t.createElement("div")), c.style.cssText = e.style.cssText = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", c.style.marginRight = c.style.width = "0", e.style.width = "1px", a.reliableMarginRight = !parseFloat((v.getComputedStyle(c, 
      null) || {}).marginRight)), f.removeChild(b));
    });
    return a;
  }({});
  var y, p, Eb = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, Db = /([A-Z])/g;
  P.uid = 1;
  P.accepts = function(a) {
    return a.nodeType ? 1 === a.nodeType || 9 === a.nodeType : !0;
  };
  P.prototype = {key:function(a) {
    if (!P.accepts(a)) {
      return 0;
    }
    var b = {}, c = a[this.expando];
    if (!c) {
      c = P.uid++;
      try {
        b[this.expando] = {value:c}, Object.defineProperties(a, b);
      } catch (e) {
        b[this.expando] = c, d.extend(a, b);
      }
    }
    this.cache[c] || (this.cache[c] = {});
    return c;
  }, set:function(a, b, c) {
    var e;
    a = this.key(a);
    var f = this.cache[a];
    if ("string" === typeof b) {
      f[b] = c;
    } else {
      if (d.isEmptyObject(f)) {
        this.cache[a] = b;
      } else {
        for (e in b) {
          f[e] = b[e];
        }
      }
    }
  }, get:function(a, b) {
    var c = this.cache[this.key(a)];
    return b === n ? c : c[b];
  }, access:function(a, b, c) {
    if (b === n || b && "string" === typeof b && c === n) {
      return this.get(a, b);
    }
    this.set(a, b, c);
    return c !== n ? c : b;
  }, remove:function(a, b) {
    var c, e;
    c = this.key(a);
    var f = this.cache[c];
    if (b === n) {
      this.cache[c] = {};
    } else {
      for (d.isArray(b) ? e = b.concat(b.map(d.camelCase)) : (b in f) ? e = [b] : (e = d.camelCase(b), e = e in f ? [e] : e.match(M) || []), c = e.length;c--;) {
        delete f[e[c]];
      }
    }
  }, hasData:function(a) {
    return!d.isEmptyObject(this.cache[a[this.expando]] || {});
  }, discard:function(a) {
    delete this.cache[this.key(a)];
  }};
  y = new P;
  p = new P;
  d.extend({acceptData:P.accepts, hasData:function(a) {
    return y.hasData(a) || p.hasData(a);
  }, data:function(a, b, c) {
    return y.access(a, b, c);
  }, removeData:function(a, b) {
    y.remove(a, b);
  }, _data:function(a, b, c) {
    return p.access(a, b, c);
  }, _removeData:function(a, b) {
    p.remove(a, b);
  }});
  d.fn.extend({data:function(a, b) {
    var c, e, f = this[0], g = 0, h = null;
    if (a === n) {
      if (this.length && (h = y.get(f), 1 === f.nodeType && !p.get(f, "hasDataAttrs"))) {
        for (c = f.attributes;g < c.length;g++) {
          e = c[g].name, 0 === e.indexOf("data-") && (e = d.camelCase(e.substring(5)), Oa(f, e, h[e]));
        }
        p.set(f, "hasDataAttrs", !0);
      }
      return h;
    }
    return "object" === typeof a ? this.each(function() {
      y.set(this, a);
    }) : d.access(this, function(b) {
      var c, e = d.camelCase(a);
      if (f && b === n) {
        c = y.get(f, a);
        if (c !== n) {
          return c;
        }
        c = y.get(f, e);
        if (c !== n) {
          return c;
        }
        c = Oa(f, e, n);
        if (c !== n) {
          return c;
        }
      } else {
        this.each(function() {
          var c = y.get(this, e);
          y.set(this, e, b);
          -1 !== a.indexOf("-") && c !== n && y.set(this, a, b);
        });
      }
    }, null, b, 1 < arguments.length, null, !0);
  }, removeData:function(a) {
    return this.each(function() {
      y.remove(this, a);
    });
  }});
  d.extend({queue:function(a, b, c) {
    var e;
    if (a) {
      return b = (b || "fx") + "queue", e = p.get(a, b), c && (!e || d.isArray(c) ? e = p.access(a, b, d.makeArray(c)) : e.push(c)), e || [];
    }
  }, dequeue:function(a, b) {
    b = b || "fx";
    var c = d.queue(a, b), e = c.length, f = c.shift(), g = d._queueHooks(a, b), h = function() {
      d.dequeue(a, b);
    };
    "inprogress" === f && (f = c.shift(), e--);
    if (g.cur = f) {
      "fx" === b && c.unshift("inprogress"), delete g.stop, f.call(a, h, g);
    }
    !e && g && g.empty.fire();
  }, _queueHooks:function(a, b) {
    var c = b + "queueHooks";
    return p.get(a, c) || p.access(a, c, {empty:d.Callbacks("once memory").add(function() {
      p.remove(a, [b + "queue", c]);
    })});
  }});
  d.fn.extend({queue:function(a, b) {
    var c = 2;
    "string" !== typeof a && (b = a, a = "fx", c--);
    return arguments.length < c ? d.queue(this[0], a) : b === n ? this : this.each(function() {
      var c = d.queue(this, a, b);
      d._queueHooks(this, a);
      "fx" === a && "inprogress" !== c[0] && d.dequeue(this, a);
    });
  }, dequeue:function(a) {
    return this.each(function() {
      d.dequeue(this, a);
    });
  }, delay:function(a, b) {
    a = d.fx ? d.fx.speeds[a] || a : a;
    return this.queue(b || "fx", function(b, d) {
      var f = setTimeout(b, a);
      d.stop = function() {
        clearTimeout(f);
      };
    });
  }, clearQueue:function(a) {
    return this.queue(a || "fx", []);
  }, promise:function(a, b) {
    var c, e = 1, f = d.Deferred(), g = this, h = this.length, k = function() {
      --e || f.resolveWith(g, [g]);
    };
    "string" !== typeof a && (b = a, a = n);
    for (a = a || "fx";h--;) {
      (c = p.get(g[h], a + "queueHooks")) && c.empty && (e++, c.empty.add(k));
    }
    k();
    return f.promise(b);
  }});
  var lb, Ja = /[\t\r\n]/g, Xb = /\r/g, Yb = /^(?:input|select|textarea|button)$/i;
  d.fn.extend({attr:function(a, b) {
    return d.access(this, d.attr, a, b, 1 < arguments.length);
  }, removeAttr:function(a) {
    return this.each(function() {
      d.removeAttr(this, a);
    });
  }, prop:function(a, b) {
    return d.access(this, d.prop, a, b, 1 < arguments.length);
  }, removeProp:function(a) {
    return this.each(function() {
      delete this[d.propFix[a] || a];
    });
  }, addClass:function(a) {
    var b, c, e, f, g, h = 0, k = this.length;
    b = "string" === typeof a && a;
    if (d.isFunction(a)) {
      return this.each(function(b) {
        d(this).addClass(a.call(this, b, this.className));
      });
    }
    if (b) {
      for (b = (a || "").match(M) || [];h < k;h++) {
        if (c = this[h], e = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ja, " ") : " ")) {
          for (g = 0;f = b[g++];) {
            0 > e.indexOf(" " + f + " ") && (e += f + " ");
          }
          c.className = d.trim(e);
        }
      }
    }
    return this;
  }, removeClass:function(a) {
    var b, c, e, f, g, h = 0, k = this.length;
    b = 0 === arguments.length || "string" === typeof a && a;
    if (d.isFunction(a)) {
      return this.each(function(b) {
        d(this).removeClass(a.call(this, b, this.className));
      });
    }
    if (b) {
      for (b = (a || "").match(M) || [];h < k;h++) {
        if (c = this[h], e = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ja, " ") : "")) {
          for (g = 0;f = b[g++];) {
            for (;0 <= e.indexOf(" " + f + " ");) {
              e = e.replace(" " + f + " ", " ");
            }
          }
          c.className = a ? d.trim(e) : "";
        }
      }
    }
    return this;
  }, toggleClass:function(a, b) {
    var c = typeof a, e = "boolean" === typeof b;
    return d.isFunction(a) ? this.each(function(c) {
      d(this).toggleClass(a.call(this, c, this.className, b), b);
    }) : this.each(function() {
      if ("string" === c) {
        for (var f, g = 0, h = d(this), k = b, l = a.match(M) || [];f = l[g++];) {
          k = e ? k : !h.hasClass(f), h[k ? "addClass" : "removeClass"](f);
        }
      } else {
        if (c === pa || "boolean" === c) {
          this.className && p.set(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : p.get(this, "__className__") || "";
        }
      }
    });
  }, hasClass:function(a) {
    a = " " + a + " ";
    for (var b = 0, c = this.length;b < c;b++) {
      if (1 === this[b].nodeType && 0 <= (" " + this[b].className + " ").replace(Ja, " ").indexOf(a)) {
        return!0;
      }
    }
    return!1;
  }, val:function(a) {
    var b, c, e, f = this[0];
    if (arguments.length) {
      return e = d.isFunction(a), this.each(function(c) {
        var f = d(this);
        1 === this.nodeType && (c = e ? a.call(this, c, f.val()) : a, null == c ? c = "" : "number" === typeof c ? c += "" : d.isArray(c) && (c = d.map(c, function(a) {
          return null == a ? "" : a + "";
        })), b = d.valHooks[this.type] || d.valHooks[this.nodeName.toLowerCase()], b && "set" in b && b.set(this, c, "value") !== n || (this.value = c));
      });
    }
    if (f) {
      if ((b = d.valHooks[f.type] || d.valHooks[f.nodeName.toLowerCase()]) && "get" in b && (c = b.get(f, "value")) !== n) {
        return c;
      }
      c = f.value;
      return "string" === typeof c ? c.replace(Xb, "") : null == c ? "" : c;
    }
  }});
  d.extend({valHooks:{option:{get:function(a) {
    var b = a.attributes.value;
    return!b || b.specified ? a.value : a.text;
  }}, select:{get:function(a) {
    for (var b, c = a.options, e = a.selectedIndex, f = (a = "select-one" === a.type || 0 > e) ? null : [], g = a ? e + 1 : c.length, h = 0 > e ? g : a ? e : 0;h < g;h++) {
      if (b = c[h], !(!b.selected && h !== e || (d.support.optDisabled ? b.disabled : null !== b.getAttribute("disabled")) || b.parentNode.disabled && d.nodeName(b.parentNode, "optgroup"))) {
        b = d(b).val();
        if (a) {
          return b;
        }
        f.push(b);
      }
    }
    return f;
  }, set:function(a, b) {
    for (var c, e, f = a.options, g = d.makeArray(b), h = f.length;h--;) {
      if (e = f[h], e.selected = 0 <= d.inArray(d(e).val(), g)) {
        c = !0;
      }
    }
    c || (a.selectedIndex = -1);
    return g;
  }}}, attr:function(a, b, c) {
    var e, f, g = a.nodeType;
    if (a && 3 !== g && 8 !== g && 2 !== g) {
      if (typeof a.getAttribute === pa) {
        return d.prop(a, b, c);
      }
      1 === g && d.isXMLDoc(a) || (b = b.toLowerCase(), e = d.attrHooks[b] || (d.expr.match["boolean"].test(b) ? lb : void 0));
      if (c !== n) {
        if (null === c) {
          d.removeAttr(a, b);
        } else {
          if (e && "set" in e && (f = e.set(a, c, b)) !== n) {
            return f;
          }
          a.setAttribute(b, c + "");
          return c;
        }
      } else {
        if (e && "get" in e && null !== (f = e.get(a, b))) {
          return f;
        }
        f = d.find.attr(a, b);
        return null == f ? n : f;
      }
    }
  }, removeAttr:function(a, b) {
    var c, e, f = 0, g = b && b.match(M);
    if (g && 1 === a.nodeType) {
      for (;c = g[f++];) {
        e = d.propFix[c] || c, d.expr.match["boolean"].test(c) && (a[e] = !1), a.removeAttribute(c);
      }
    }
  }, attrHooks:{type:{set:function(a, b) {
    if (!d.support.radioValue && "radio" === b && d.nodeName(a, "input")) {
      var c = a.value;
      a.setAttribute("type", b);
      c && (a.value = c);
      return b;
    }
  }}}, propFix:{"for":"htmlFor", "class":"className"}, prop:function(a, b, c) {
    var e, f, g;
    g = a.nodeType;
    if (a && 3 !== g && 8 !== g && 2 !== g) {
      if (g = 1 !== g || !d.isXMLDoc(a)) {
        b = d.propFix[b] || b, f = d.propHooks[b];
      }
      return c !== n ? f && "set" in f && (e = f.set(a, c, b)) !== n ? e : a[b] = c : f && "get" in f && null !== (e = f.get(a, b)) ? e : a[b];
    }
  }, propHooks:{tabIndex:{get:function(a) {
    return a.hasAttribute("tabindex") || Yb.test(a.nodeName) || a.href ? a.tabIndex : -1;
  }}}});
  lb = {set:function(a, b, c) {
    !1 === b ? d.removeAttr(a, c) : a.setAttribute(c, c);
    return c;
  }};
  d.each(d.expr.match["boolean"].source.match(/\w+/g), function(a, b) {
    var c = d.expr.attrHandle[b] || d.find.attr;
    d.expr.attrHandle[b] = function(a, b, g) {
      var h = d.expr.attrHandle[b];
      a = g ? n : (d.expr.attrHandle[b] = n) != c(a, b, g) ? b.toLowerCase() : null;
      d.expr.attrHandle[b] = h;
      return a;
    };
  });
  d.support.optSelected || (d.propHooks.selected = {get:function(a) {
    (a = a.parentNode) && a.parentNode && a.parentNode.selectedIndex;
    return null;
  }});
  d.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function() {
    d.propFix[this.toLowerCase()] = this;
  });
  d.each(["radio", "checkbox"], function() {
    d.valHooks[this] = {set:function(a, b) {
      if (d.isArray(b)) {
        return a.checked = 0 <= d.inArray(d(a).val(), b);
      }
    }};
    d.support.checkOn || (d.valHooks[this].get = function(a) {
      return null === a.getAttribute("value") ? "on" : a.value;
    });
  });
  var Zb = /^key/, $b = /^(?:mouse|contextmenu)|click/, mb = /^(?:focusinfocus|focusoutblur)$/, nb = /^([^.]*)(?:\.(.+)|)$/;
  d.event = {global:{}, add:function(a, b, c, e, f) {
    var g, h, k, l, q, r, m, u, B;
    if (q = p.get(a)) {
      c.handler && (g = c, c = g.handler, f = g.selector);
      c.guid || (c.guid = d.guid++);
      (l = q.events) || (l = q.events = {});
      (h = q.handle) || (h = q.handle = function(a) {
        return typeof d === pa || a && d.event.triggered === a.type ? n : d.event.dispatch.apply(h.elem, arguments);
      }, h.elem = a);
      b = (b || "").match(M) || [""];
      for (q = b.length;q--;) {
        k = nb.exec(b[q]) || [], u = r = k[1], B = (k[2] || "").split(".").sort(), u && (k = d.event.special[u] || {}, u = (f ? k.delegateType : k.bindType) || u, k = d.event.special[u] || {}, r = d.extend({type:u, origType:r, data:e, handler:c, guid:c.guid, selector:f, needsContext:f && d.expr.match.needsContext.test(f), namespace:B.join(".")}, g), (m = l[u]) || (m = l[u] = [], m.delegateCount = 0, k.setup && !1 !== k.setup.call(a, e, B, h) || a.addEventListener && a.addEventListener(u, h, !1)), 
        k.add && (k.add.call(a, r), r.handler.guid || (r.handler.guid = c.guid)), f ? m.splice(m.delegateCount++, 0, r) : m.push(r), d.event.global[u] = !0);
      }
      a = null;
    }
  }, remove:function(a, b, c, e, f) {
    var g, h, k, l, q, n, m, u, B, t, v, y = p.hasData(a) && p.get(a);
    if (y && (l = y.events)) {
      b = (b || "").match(M) || [""];
      for (q = b.length;q--;) {
        if (k = nb.exec(b[q]) || [], B = v = k[1], t = (k[2] || "").split(".").sort(), B) {
          m = d.event.special[B] || {};
          B = (e ? m.delegateType : m.bindType) || B;
          u = l[B] || [];
          k = k[2] && new RegExp("(^|\\.)" + t.join("\\.(?:.*\\.|)") + "(\\.|$)");
          for (h = g = u.length;g--;) {
            n = u[g], !f && v !== n.origType || c && c.guid !== n.guid || k && !k.test(n.namespace) || e && e !== n.selector && ("**" !== e || !n.selector) || (u.splice(g, 1), n.selector && u.delegateCount--, m.remove && m.remove.call(a, n));
          }
          h && !u.length && (m.teardown && !1 !== m.teardown.call(a, t, y.handle) || d.removeEvent(a, B, y.handle), delete l[B]);
        } else {
          for (B in l) {
            d.event.remove(a, B + b[q], c, e, !0);
          }
        }
      }
      d.isEmptyObject(l) && (delete y.handle, p.remove(a, "events"));
    }
  }, trigger:function(a, b, c, e) {
    var f, g, h, k, l, q, r = [c || t], m = Ha.call(a, "type") ? a.type : a;
    q = Ha.call(a, "namespace") ? a.namespace.split(".") : [];
    g = f = c = c || t;
    if (3 !== c.nodeType && 8 !== c.nodeType && !mb.test(m + d.event.triggered) && (0 <= m.indexOf(".") && (q = m.split("."), m = q.shift(), q.sort()), k = 0 > m.indexOf(":") && "on" + m, a = a[d.expando] ? a : new d.Event(m, "object" === typeof a && a), a.isTrigger = e ? 2 : 3, a.namespace = q.join("."), a.namespace_re = a.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, a.result = n, a.target || (a.target = c), b = null == b ? [a] : d.makeArray(b, [a]), q = d.event.special[m] || 
    {}, e || !q.trigger || !1 !== q.trigger.apply(c, b))) {
      if (!e && !q.noBubble && !d.isWindow(c)) {
        h = q.delegateType || m;
        mb.test(h + m) || (g = g.parentNode);
        for (;g;g = g.parentNode) {
          r.push(g), f = g;
        }
        f === (c.ownerDocument || t) && r.push(f.defaultView || f.parentWindow || v);
      }
      for (f = 0;(g = r[f++]) && !a.isPropagationStopped();) {
        a.type = 1 < f ? h : q.bindType || m, (l = (p.get(g, "events") || {})[a.type] && p.get(g, "handle")) && l.apply(g, b), (l = k && g[k]) && d.acceptData(g) && l.apply && !1 === l.apply(g, b) && a.preventDefault();
      }
      a.type = m;
      e || a.isDefaultPrevented() || q._default && !1 !== q._default.apply(r.pop(), b) || !d.acceptData(c) || !k || !d.isFunction(c[m]) || d.isWindow(c) || ((f = c[k]) && (c[k] = null), d.event.triggered = m, c[m](), d.event.triggered = n, f && (c[k] = f));
      return a.result;
    }
  }, dispatch:function(a) {
    a = d.event.fix(a);
    var b, c, e, f, g = [], h = T.call(arguments);
    b = (p.get(this, "events") || {})[a.type] || [];
    var k = d.event.special[a.type] || {};
    h[0] = a;
    a.delegateTarget = this;
    if (!k.preDispatch || !1 !== k.preDispatch.call(this, a)) {
      g = d.event.handlers.call(this, a, b);
      for (b = 0;(f = g[b++]) && !a.isPropagationStopped();) {
        for (a.currentTarget = f.elem, c = 0;(e = f.handlers[c++]) && !a.isImmediatePropagationStopped();) {
          if (!a.namespace_re || a.namespace_re.test(e.namespace)) {
            a.handleObj = e, a.data = e.data, e = ((d.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, h), e !== n && !1 === (a.result = e) && (a.preventDefault(), a.stopPropagation());
          }
        }
      }
      k.postDispatch && k.postDispatch.call(this, a);
      return a.result;
    }
  }, handlers:function(a, b) {
    var c, e, f, g, h = [], k = b.delegateCount, l = a.target;
    if (k && l.nodeType && (!a.button || "click" !== a.type)) {
      for (;l !== this;l = l.parentNode || this) {
        if (!0 !== l.disabled || "click" !== a.type) {
          e = [];
          for (c = 0;c < k;c++) {
            g = b[c], f = g.selector + " ", e[f] === n && (e[f] = g.needsContext ? 0 <= d(f, this).index(l) : d.find(f, this, null, [l]).length), e[f] && e.push(g);
          }
          e.length && h.push({elem:l, handlers:e});
        }
      }
    }
    k < b.length && h.push({elem:this, handlers:b.slice(k)});
    return h;
  }, props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks:{}, keyHooks:{props:["char", "charCode", "key", "keyCode"], filter:function(a, b) {
    null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode);
    return a;
  }}, mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter:function(a, b) {
    var c, d, f = b.button;
    null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || t, d = c.documentElement, c = c.body, a.pageX = b.clientX + (d && d.scrollLeft || c && c.scrollLeft || 0) - (d && d.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || c && c.scrollTop || 0) - (d && d.clientTop || c && c.clientTop || 0));
    a.which || f === n || (a.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0);
    return a;
  }}, fix:function(a) {
    if (a[d.expando]) {
      return a;
    }
    var b, c, e;
    b = a.type;
    var f = a, g = this.fixHooks[b];
    g || (this.fixHooks[b] = g = $b.test(b) ? this.mouseHooks : Zb.test(b) ? this.keyHooks : {});
    e = g.props ? this.props.concat(g.props) : this.props;
    a = new d.Event(f);
    for (b = e.length;b--;) {
      c = e[b], a[c] = f[c];
    }
    3 === a.target.nodeType && (a.target = a.target.parentNode);
    return g.filter ? g.filter(a, f) : a;
  }, special:{load:{noBubble:!0}, focus:{trigger:function() {
    if (this !== Pa() && this.focus) {
      return this.focus(), !1;
    }
  }, delegateType:"focusin"}, blur:{trigger:function() {
    if (this === Pa() && this.blur) {
      return this.blur(), !1;
    }
  }, delegateType:"focusout"}, click:{trigger:function() {
    if ("checkbox" === this.type && this.click && d.nodeName(this, "input")) {
      return this.click(), !1;
    }
  }, _default:function(a) {
    return d.nodeName(a.target, "a");
  }}, beforeunload:{postDispatch:function(a) {
    a.result !== n && (a.originalEvent.returnValue = a.result);
  }}}, simulate:function(a, b, c, e) {
    a = d.extend(new d.Event, c, {type:a, isSimulated:!0, originalEvent:{}});
    e ? d.event.trigger(a, null, b) : d.event.dispatch.call(b, a);
    a.isDefaultPrevented() && c.preventDefault();
  }};
  d.removeEvent = function(a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1);
  };
  d.Event = function(a, b) {
    if (!(this instanceof d.Event)) {
      return new d.Event(a, b);
    }
    a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.getPreventDefault && a.getPreventDefault() ? la : O) : this.type = a;
    b && d.extend(this, b);
    this.timeStamp = a && a.timeStamp || d.now();
    this[d.expando] = !0;
  };
  d.Event.prototype = {isDefaultPrevented:O, isPropagationStopped:O, isImmediatePropagationStopped:O, preventDefault:function() {
    var a = this.originalEvent;
    this.isDefaultPrevented = la;
    a && a.preventDefault && a.preventDefault();
  }, stopPropagation:function() {
    var a = this.originalEvent;
    this.isPropagationStopped = la;
    a && a.stopPropagation && a.stopPropagation();
  }, stopImmediatePropagation:function() {
    this.isImmediatePropagationStopped = la;
    this.stopPropagation();
  }};
  d.each({mouseenter:"mouseover", mouseleave:"mouseout"}, function(a, b) {
    d.event.special[a] = {delegateType:b, bindType:b, handle:function(a) {
      var e, f = a.relatedTarget, g = a.handleObj;
      if (!f || f !== this && !d.contains(this, f)) {
        a.type = g.origType, e = g.handler.apply(this, arguments), a.type = b;
      }
      return e;
    }};
  });
  d.support.focusinBubbles || d.each({focus:"focusin", blur:"focusout"}, function(a, b) {
    var c = 0, e = function(a) {
      d.event.simulate(b, a.target, d.event.fix(a), !0);
    };
    d.event.special[b] = {setup:function() {
      0 === c++ && t.addEventListener(a, e, !0);
    }, teardown:function() {
      0 === --c && t.removeEventListener(a, e, !0);
    }};
  });
  d.fn.extend({on:function(a, b, c, e, f) {
    var g, h;
    if ("object" === typeof a) {
      "string" !== typeof b && (c = c || b, b = n);
      for (h in a) {
        this.on(h, b, c, a[h], f);
      }
      return this;
    }
    null == c && null == e ? (e = b, c = b = n) : null == e && ("string" === typeof b ? (e = c, c = n) : (e = c, c = b, b = n));
    if (!1 === e) {
      e = O;
    } else {
      if (!e) {
        return this;
      }
    }
    1 === f && (g = e, e = function(a) {
      d().off(a);
      return g.apply(this, arguments);
    }, e.guid = g.guid || (g.guid = d.guid++));
    return this.each(function() {
      d.event.add(this, a, e, c, b);
    });
  }, one:function(a, b, c, d) {
    return this.on(a, b, c, d, 1);
  }, off:function(a, b, c) {
    var e;
    if (a && a.preventDefault && a.handleObj) {
      return e = a.handleObj, d(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
    }
    if ("object" === typeof a) {
      for (e in a) {
        this.off(e, b, a[e]);
      }
      return this;
    }
    if (!1 === b || "function" === typeof b) {
      c = b, b = n;
    }
    !1 === c && (c = O);
    return this.each(function() {
      d.event.remove(this, a, c, b);
    });
  }, trigger:function(a, b) {
    return this.each(function() {
      d.event.trigger(a, b, this);
    });
  }, triggerHandler:function(a, b) {
    var c = this[0];
    if (c) {
      return d.event.trigger(a, b, c, !0);
    }
  }});
  var Fb = /^.[^:#\[\.,]*$/, ob = d.expr.match.needsContext, ac = {children:!0, contents:!0, next:!0, prev:!0};
  d.fn.extend({find:function(a) {
    var b, c, e, f = this.length;
    if ("string" !== typeof a) {
      return b = this, this.pushStack(d(a).filter(function() {
        for (e = 0;e < f;e++) {
          if (d.contains(b[e], this)) {
            return!0;
          }
        }
      }));
    }
    c = [];
    for (e = 0;e < f;e++) {
      d.find(a, this[e], c);
    }
    c = this.pushStack(1 < f ? d.unique(c) : c);
    c.selector = (this.selector ? this.selector + " " : "") + a;
    return c;
  }, has:function(a) {
    var b = d(a, this), c = b.length;
    return this.filter(function() {
      for (var a = 0;a < c;a++) {
        if (d.contains(this, b[a])) {
          return!0;
        }
      }
    });
  }, not:function(a) {
    return this.pushStack(Ra(this, a || [], !0));
  }, filter:function(a) {
    return this.pushStack(Ra(this, a || [], !1));
  }, is:function(a) {
    return!!a && ("string" === typeof a ? ob.test(a) ? 0 <= d(a, this.context).index(this[0]) : 0 < d.filter(a, this).length : 0 < this.filter(a).length);
  }, closest:function(a, b) {
    for (var c, e = 0, f = this.length, g = [], h = ob.test(a) || "string" !== typeof a ? d(a, b || this.context) : 0;e < f;e++) {
      for (c = this[e];c && c !== b;c = c.parentNode) {
        if (11 > c.nodeType && (h ? -1 < h.index(c) : 1 === c.nodeType && d.find.matchesSelector(c, a))) {
          g.push(c);
          break;
        }
      }
    }
    return this.pushStack(1 < g.length ? d.unique(g) : g);
  }, index:function(a) {
    return a ? "string" === typeof a ? ma.call(d(a), this[0]) : ma.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
  }, add:function(a, b) {
    var c = "string" === typeof a ? d(a, b) : d.makeArray(a && a.nodeType ? [a] : a), c = d.merge(this.get(), c);
    return this.pushStack(d.unique(c));
  }, addBack:function(a) {
    return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
  }});
  d.each({parent:function(a) {
    return(a = a.parentNode) && 11 !== a.nodeType ? a : null;
  }, parents:function(a) {
    return d.dir(a, "parentNode");
  }, parentsUntil:function(a, b, c) {
    return d.dir(a, "parentNode", c);
  }, next:function(a) {
    return Qa(a, "nextSibling");
  }, prev:function(a) {
    return Qa(a, "previousSibling");
  }, nextAll:function(a) {
    return d.dir(a, "nextSibling");
  }, prevAll:function(a) {
    return d.dir(a, "previousSibling");
  }, nextUntil:function(a, b, c) {
    return d.dir(a, "nextSibling", c);
  }, prevUntil:function(a, b, c) {
    return d.dir(a, "previousSibling", c);
  }, siblings:function(a) {
    return d.sibling((a.parentNode || {}).firstChild, a);
  }, children:function(a) {
    return d.sibling(a.firstChild);
  }, contents:function(a) {
    return d.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : d.merge([], a.childNodes);
  }}, function(a, b) {
    d.fn[a] = function(c, e) {
      var f = d.map(this, b, c);
      "Until" !== a.slice(-5) && (e = c);
      e && "string" === typeof e && (f = d.filter(e, f));
      1 < this.length && (ac[a] || d.unique(f), "p" === a[0] && f.reverse());
      return this.pushStack(f);
    };
  });
  d.extend({filter:function(a, b, c) {
    var e = b[0];
    c && (a = ":not(" + a + ")");
    return 1 === b.length && 1 === e.nodeType ? d.find.matchesSelector(e, a) ? [e] : [] : d.find.matches(a, d.grep(b, function(a) {
      return 1 === a.nodeType;
    }));
  }, dir:function(a, b, c) {
    for (var e = [], f = c !== n;(a = a[b]) && 9 !== a.nodeType;) {
      if (1 === a.nodeType) {
        if (f && d(a).is(c)) {
          break;
        }
        e.push(a);
      }
    }
    return e;
  }, sibling:function(a, b) {
    for (var c = [];a;a = a.nextSibling) {
      1 === a.nodeType && a !== b && c.push(a);
    }
    return c;
  }});
  var pb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, qb = /<([\w:]+)/, bc = /<|&#?\w+;/, cc = /<(?:script|style|link)/i, rb = /^(?:checkbox|radio)$/i, dc = /checked\s*(?:[^=]|=\s*.checked.)/i, sb = /^$|\/(?:java|ecma)script/i, Ib = /^true\/(.*)/, ec = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, G = {option:[1, "<select multiple='multiple'>", "</select>"], thead:[1, "<table>", "</table>"], tr:[2, "<table><tbody>", "</tbody></table>"], td:[3, "<table><tbody><tr>", "</tr></tbody></table>"], 
  _default:[0, "", ""]};
  G.optgroup = G.option;
  G.tbody = G.tfoot = G.colgroup = G.caption = G.col = G.thead;
  G.th = G.td;
  d.fn.extend({text:function(a) {
    return d.access(this, function(a) {
      return a === n ? d.text(this) : this.empty().append((this[0] && this[0].ownerDocument || t).createTextNode(a));
    }, null, a, arguments.length);
  }, append:function() {
    return this.domManip(arguments, function(a) {
      1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Sa(this, a).appendChild(a);
    });
  }, prepend:function() {
    return this.domManip(arguments, function(a) {
      if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
        var b = Sa(this, a);
        b.insertBefore(a, b.firstChild);
      }
    });
  }, before:function() {
    return this.domManip(arguments, function(a) {
      this.parentNode && this.parentNode.insertBefore(a, this);
    });
  }, after:function() {
    return this.domManip(arguments, function(a) {
      this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
    });
  }, remove:function(a, b) {
    for (var c, e = a ? d.filter(a, this) : this, f = 0;null != (c = e[f]);f++) {
      b || 1 !== c.nodeType || d.cleanData(C(c)), c.parentNode && (b && d.contains(c.ownerDocument, c) && xa(C(c, "script")), c.parentNode.removeChild(c));
    }
    return this;
  }, empty:function() {
    for (var a, b = 0;null != (a = this[b]);b++) {
      1 === a.nodeType && (d.cleanData(C(a, !1)), a.textContent = "");
    }
    return this;
  }, clone:function(a, b) {
    a = null == a ? !1 : a;
    b = null == b ? a : b;
    return this.map(function() {
      return d.clone(this, a, b);
    });
  }, html:function(a) {
    return d.access(this, function(a) {
      var c = this[0] || {}, e = 0, f = this.length;
      if (a === n && 1 === c.nodeType) {
        return c.innerHTML;
      }
      if ("string" === typeof a && !cc.test(a) && !G[(qb.exec(a) || ["", ""])[1].toLowerCase()]) {
        a = a.replace(pb, "<$1></$2>");
        try {
          for (;e < f;e++) {
            c = this[e] || {}, 1 === c.nodeType && (d.cleanData(C(c, !1)), c.innerHTML = a);
          }
          c = 0;
        } catch (g) {
        }
      }
      c && this.empty().append(a);
    }, null, a, arguments.length);
  }, replaceWith:function() {
    var a = d.map(this, function(a) {
      return[a.nextSibling, a.parentNode];
    }), b = 0;
    this.domManip(arguments, function(c) {
      var e = a[b++], f = a[b++];
      f && (d(this).remove(), f.insertBefore(c, e));
    }, !0);
    return b ? this : this.remove();
  }, detach:function(a) {
    return this.remove(a, !0);
  }, domManip:function(a, b, c) {
    a = ib.apply([], a);
    var e, f, g, h, k = 0, l = this.length, n = this, r = l - 1, m = a[0], u = d.isFunction(m);
    if (u || !(1 >= l || "string" !== typeof m || d.support.checkClone) && dc.test(m)) {
      return this.each(function(d) {
        var e = n.eq(d);
        u && (a[0] = m.call(this, d, e.html()));
        e.domManip(a, b, c);
      });
    }
    if (l && (e = d.buildFragment(a, this[0].ownerDocument, !1, !c && this), f = e.firstChild, 1 === e.childNodes.length && (e = f), f)) {
      f = d.map(C(e, "script"), Gb);
      for (g = f.length;k < l;k++) {
        h = e, k !== r && (h = d.clone(h, !0, !0), g && d.merge(f, C(h, "script"))), b.call(this[k], h, k);
      }
      if (g) {
        for (e = f[f.length - 1].ownerDocument, d.map(f, Hb), k = 0;k < g;k++) {
          h = f[k], sb.test(h.type || "") && !p.access(h, "globalEval") && d.contains(e, h) && (h.src ? d._evalUrl(h.src) : d.globalEval(h.textContent.replace(ec, "")));
        }
      }
    }
    return this;
  }});
  d.each({appendTo:"append", prependTo:"prepend", insertBefore:"before", insertAfter:"after", replaceAll:"replaceWith"}, function(a, b) {
    d.fn[a] = function(a) {
      for (var e = [], f = d(a), g = f.length - 1, h = 0;h <= g;h++) {
        a = h === g ? this : this.clone(!0), d(f[h])[b](a), Ga.apply(e, a.get());
      }
      return this.pushStack(e);
    };
  });
  d.extend({clone:function(a, b, c) {
    var e, f, g, h, k = a.cloneNode(!0), l = d.contains(a.ownerDocument, a);
    if (!(d.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || d.isXMLDoc(a))) {
      for (h = C(k), g = C(a), e = 0, f = g.length;e < f;e++) {
        var n = g[e], p = h[e], m = p.nodeName.toLowerCase();
        if ("input" === m && rb.test(n.type)) {
          p.checked = n.checked;
        } else {
          if ("input" === m || "textarea" === m) {
            p.defaultValue = n.defaultValue;
          }
        }
      }
    }
    if (b) {
      if (c) {
        for (g = g || C(a), h = h || C(k), e = 0, f = g.length;e < f;e++) {
          Ta(g[e], h[e]);
        }
      } else {
        Ta(a, k);
      }
    }
    h = C(k, "script");
    0 < h.length && xa(h, !l && C(a, "script"));
    return k;
  }, buildFragment:function(a, b, c, e) {
    for (var f, g, h, k = 0, l = a.length, n = b.createDocumentFragment(), p = [];k < l;k++) {
      if ((f = a[k]) || 0 === f) {
        if ("object" === d.type(f)) {
          d.merge(p, f.nodeType ? [f] : f);
        } else {
          if (bc.test(f)) {
            g = g || n.appendChild(b.createElement("div"));
            h = (qb.exec(f) || ["", ""])[1].toLowerCase();
            h = G[h] || G._default;
            g.innerHTML = h[1] + f.replace(pb, "<$1></$2>") + h[2];
            for (h = h[0];h--;) {
              g = g.firstChild;
            }
            d.merge(p, g.childNodes);
            g = n.firstChild;
            g.textContent = "";
          } else {
            p.push(b.createTextNode(f));
          }
        }
      }
    }
    n.textContent = "";
    for (k = 0;f = p[k++];) {
      if (!e || -1 === d.inArray(f, e)) {
        if (a = d.contains(f.ownerDocument, f), g = C(n.appendChild(f), "script"), a && xa(g), c) {
          for (h = 0;f = g[h++];) {
            sb.test(f.type || "") && c.push(f);
          }
        }
      }
    }
    return n;
  }, cleanData:function(a) {
    for (var b, c, e, f = a.length, g = 0, h = d.event.special;g < f;g++) {
      c = a[g];
      if (d.acceptData(c) && (b = p.access(c))) {
        for (e in b.events) {
          h[e] ? d.event.remove(c, e) : d.removeEvent(c, e, b.handle);
        }
      }
      y.discard(c);
      p.discard(c);
    }
  }, _evalUrl:function(a) {
    return d.ajax({url:a, type:"GET", dataType:"text", async:!1, global:!1, success:d.globalEval});
  }});
  d.fn.extend({wrapAll:function(a) {
    var b;
    if (d.isFunction(a)) {
      return this.each(function(b) {
        d(this).wrapAll(a.call(this, b));
      });
    }
    this[0] && (b = d(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
      for (var a = this;a.firstElementChild;) {
        a = a.firstElementChild;
      }
      return a;
    }).append(this));
    return this;
  }, wrapInner:function(a) {
    return d.isFunction(a) ? this.each(function(b) {
      d(this).wrapInner(a.call(this, b));
    }) : this.each(function() {
      var b = d(this), c = b.contents();
      c.length ? c.wrapAll(a) : b.append(a);
    });
  }, wrap:function(a) {
    var b = d.isFunction(a);
    return this.each(function(c) {
      d(this).wrapAll(b ? a.call(this, c) : a);
    });
  }, unwrap:function() {
    return this.parent().each(function() {
      d.nodeName(this, "body") || d(this).replaceWith(this.childNodes);
    }).end();
  }});
  var Z, aa, fc = /^(none|table(?!-c[ea]).+)/, tb = /^margin/, Kb = new RegExp("^(" + ra + ")(.*)$", "i"), Ca = new RegExp("^(" + ra + ")(?!px)[a-z%]+$", "i"), gc = new RegExp("^([+-])=(" + ra + ")", "i"), $a = {BODY:"block"}, hc = {position:"absolute", visibility:"hidden", display:"block"}, ub = {letterSpacing:0, fontWeight:400}, S = ["Top", "Right", "Bottom", "Left"], Va = ["Webkit", "O", "Moz", "ms"];
  d.fn.extend({css:function(a, b) {
    return d.access(this, function(a, b, f) {
      var g, h = {}, k = 0;
      if (d.isArray(b)) {
        f = v.getComputedStyle(a, null);
        for (g = b.length;k < g;k++) {
          h[b[k]] = d.css(a, b[k], !1, f);
        }
        return h;
      }
      return f !== n ? d.style(a, b, f) : d.css(a, b);
    }, a, b, 1 < arguments.length);
  }, show:function() {
    return Wa(this, !0);
  }, hide:function() {
    return Wa(this);
  }, toggle:function(a) {
    var b = "boolean" === typeof a;
    return this.each(function() {
      (b ? a : Y(this)) ? d(this).show() : d(this).hide();
    });
  }});
  d.extend({cssHooks:{opacity:{get:function(a, b) {
    if (b) {
      var c = Z(a, "opacity");
      return "" === c ? "1" : c;
    }
  }}}, cssNumber:{columnCount:!0, fillOpacity:!0, fontWeight:!0, lineHeight:!0, opacity:!0, orphans:!0, widows:!0, zIndex:!0, zoom:!0}, cssProps:{"float":"cssFloat"}, style:function(a, b, c, e) {
    if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
      var f, g, h, k = d.camelCase(b), l = a.style;
      b = d.cssProps[k] || (d.cssProps[k] = Ua(l, k));
      h = d.cssHooks[b] || d.cssHooks[k];
      if (c !== n) {
        g = typeof c, "string" === g && (f = gc.exec(c)) && (c = (f[1] + 1) * f[2] + parseFloat(d.css(a, b)), g = "number"), null == c || "number" === g && isNaN(c) || ("number" !== g || d.cssNumber[k] || (c += "px"), d.support.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (l[b] = "inherit"), h && "set" in h && (c = h.set(a, c, e)) === n || (l[b] = c));
      } else {
        return h && "get" in h && (f = h.get(a, !1, e)) !== n ? f : l[b];
      }
    }
  }, css:function(a, b, c, e) {
    var f, g;
    g = d.camelCase(b);
    b = d.cssProps[g] || (d.cssProps[g] = Ua(a.style, g));
    (g = d.cssHooks[b] || d.cssHooks[g]) && "get" in g && (f = g.get(a, !0, c));
    f === n && (f = Z(a, b, e));
    "normal" === f && b in ub && (f = ub[b]);
    return "" === c || c ? (a = parseFloat(f), !0 === c || d.isNumeric(a) ? a || 0 : f) : f;
  }});
  Z = function(a, b, c) {
    var e, f = (c = c || v.getComputedStyle(a, null)) ? c.getPropertyValue(b) || c[b] : n, g = a.style;
    c && ("" !== f || d.contains(a.ownerDocument, a) || (f = d.style(a, b)), Ca.test(f) && tb.test(b) && (a = g.width, b = g.minWidth, e = g.maxWidth, g.minWidth = g.maxWidth = g.width = f, f = c.width, g.width = a, g.minWidth = b, g.maxWidth = e));
    return f;
  };
  d.each(["height", "width"], function(a, b) {
    d.cssHooks[b] = {get:function(a, e, f) {
      if (e) {
        return 0 === a.offsetWidth && fc.test(d.css(a, "display")) ? d.swap(a, hc, function() {
          return Za(a, b, f);
        }) : Za(a, b, f);
      }
    }, set:function(a, e, f) {
      var g = f && v.getComputedStyle(a, null);
      return Xa(a, e, f ? Ya(a, b, f, d.support.boxSizing && "border-box" === d.css(a, "boxSizing", !1, g), g) : 0);
    }};
  });
  d(function() {
    d.support.reliableMarginRight || (d.cssHooks.marginRight = {get:function(a, b) {
      if (b) {
        return d.swap(a, {display:"inline-block"}, Z, [a, "marginRight"]);
      }
    }});
    !d.support.pixelPosition && d.fn.position && d.each(["top", "left"], function(a, b) {
      d.cssHooks[b] = {get:function(a, e) {
        if (e) {
          return e = Z(a, b), Ca.test(e) ? d(a).position()[b] + "px" : e;
        }
      }};
    });
  });
  d.expr && d.expr.filters && (d.expr.filters.hidden = function(a) {
    return 0 >= a.offsetWidth && 0 >= a.offsetHeight;
  }, d.expr.filters.visible = function(a) {
    return!d.expr.filters.hidden(a);
  });
  d.each({margin:"", padding:"", border:"Width"}, function(a, b) {
    d.cssHooks[a + b] = {expand:function(c) {
      var d = 0, f = {};
      for (c = "string" === typeof c ? c.split(" ") : [c];4 > d;d++) {
        f[a + S[d] + b] = c[d] || c[d - 2] || c[0];
      }
      return f;
    }};
    tb.test(a) || (d.cssHooks[a + b].set = Xa);
  });
  var ic = /%20/g, Lb = /\[\]$/, vb = /\r?\n/g, jc = /^(?:submit|button|image|reset|file)$/i, kc = /^(?:input|select|textarea|keygen)/i;
  d.fn.extend({serialize:function() {
    return d.param(this.serializeArray());
  }, serializeArray:function() {
    return this.map(function() {
      var a = d.prop(this, "elements");
      return a ? d.makeArray(a) : this;
    }).filter(function() {
      var a = this.type;
      return this.name && !d(this).is(":disabled") && kc.test(this.nodeName) && !jc.test(a) && (this.checked || !rb.test(a));
    }).map(function(a, b) {
      var c = d(this).val();
      return null == c ? null : d.isArray(c) ? d.map(c, function(a) {
        return{name:b.name, value:a.replace(vb, "\r\n")};
      }) : {name:b.name, value:c.replace(vb, "\r\n")};
    }).get();
  }});
  d.param = function(a, b) {
    var c, e = [], f = function(a, b) {
      b = d.isFunction(b) ? b() : null == b ? "" : b;
      e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
    };
    b === n && (b = d.ajaxSettings && d.ajaxSettings.traditional);
    if (d.isArray(a) || a.jquery && !d.isPlainObject(a)) {
      d.each(a, function() {
        f(this.name, this.value);
      });
    } else {
      for (c in a) {
        Da(c, a[c], b, f);
      }
    }
    return e.join("&").replace(ic, "+");
  };
  d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
    d.fn[b] = function(a, d) {
      return 0 < arguments.length ? this.on(b, null, a, d) : this.trigger(b);
    };
  });
  d.fn.extend({hover:function(a, b) {
    return this.mouseenter(a).mouseleave(b || a);
  }, bind:function(a, b, c) {
    return this.on(a, null, b, c);
  }, unbind:function(a, b) {
    return this.off(a, null, b);
  }, delegate:function(a, b, c, d) {
    return this.on(b, a, c, d);
  }, undelegate:function(a, b, c) {
    return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
  }});
  var Q, R, Ka = d.now(), La = /\?/, lc = /#.*$/, wb = /([?&])_=[^&]*/, mc = /^(.*?):[ \t]*([^\r\n]*)$/mg, nc = /^(?:GET|HEAD)$/, oc = /^\/\//, xb = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, yb = d.fn.load, zb = {}, Ea = {}, Ab = "*/".concat("*");
  try {
    R = Ob.href;
  } catch (uc) {
    R = t.createElement("a"), R.href = "", R = R.href;
  }
  Q = xb.exec(R.toLowerCase()) || [];
  d.fn.load = function(a, b, c) {
    if ("string" !== typeof a && yb) {
      return yb.apply(this, arguments);
    }
    var e, f, g, h = this, k = a.indexOf(" ");
    0 <= k && (e = a.slice(k), a = a.slice(0, k));
    d.isFunction(b) ? (c = b, b = n) : b && "object" === typeof b && (f = "POST");
    0 < h.length && d.ajax({url:a, type:f, dataType:"html", data:b}).done(function(a) {
      g = arguments;
      h.html(e ? d("<div>").append(d.parseHTML(a)).find(e) : a);
    }).complete(c && function(a, b) {
      h.each(c, g || [a.responseText, b, a]);
    });
    return this;
  };
  d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
    d.fn[b] = function(a) {
      return this.on(b, a);
    };
  });
  d.extend({active:0, lastModified:{}, etag:{}, ajaxSettings:{url:R, type:"GET", isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Q[1]), global:!0, processData:!0, async:!0, contentType:"application/x-www-form-urlencoded; charset=UTF-8", accepts:{"*":Ab, text:"text/plain", html:"text/html", xml:"application/xml, text/xml", json:"application/json, text/javascript"}, contents:{xml:/xml/, html:/html/, json:/json/}, responseFields:{xml:"responseXML", text:"responseText", json:"responseJSON"}, 
  converters:{"* text":String, "text html":!0, "text json":d.parseJSON, "text xml":d.parseXML}, flatOptions:{url:!0, context:!0}}, ajaxSetup:function(a, b) {
    return b ? Fa(Fa(a, d.ajaxSettings), b) : Fa(d.ajaxSettings, a);
  }, ajaxPrefilter:bb(zb), ajaxTransport:bb(Ea), ajax:function(a, b) {
    function c(a, b, c, h) {
      var l, p, r, K;
      K = b;
      if (2 !== N) {
        N = 2;
        k && clearTimeout(k);
        e = n;
        g = h || "";
        x.readyState = 0 < a ? 4 : 0;
        h = 200 <= a && 300 > a || 304 === a;
        if (c) {
          r = m;
          for (var D = x, I, L, H, F, z = r.contents, C = r.dataTypes;"*" === C[0];) {
            C.shift(), I === n && (I = r.mimeType || D.getResponseHeader("Content-Type"));
          }
          if (I) {
            for (L in z) {
              if (z[L] && z[L].test(I)) {
                C.unshift(L);
                break;
              }
            }
          }
          if (C[0] in c) {
            H = C[0];
          } else {
            for (L in c) {
              if (!C[0] || r.converters[L + " " + C[0]]) {
                H = L;
                break;
              }
              F || (F = L);
            }
            H = H || F;
          }
          H ? (H !== C[0] && C.unshift(H), r = c[H]) : r = void 0;
        }
        a: {
          c = m;
          I = r;
          L = x;
          H = h;
          var E, J, A, D = {}, z = c.dataTypes.slice();
          if (z[1]) {
            for (J in c.converters) {
              D[J.toLowerCase()] = c.converters[J];
            }
          }
          for (F = z.shift();F;) {
            if (c.responseFields[F] && (L[c.responseFields[F]] = I), !A && H && c.dataFilter && (I = c.dataFilter(I, c.dataType)), A = F, F = z.shift()) {
              if ("*" === F) {
                F = A;
              } else {
                if ("*" !== A && A !== F) {
                  J = D[A + " " + F] || D["* " + F];
                  if (!J) {
                    for (E in D) {
                      if (r = E.split(" "), r[1] === F && (J = D[A + " " + r[0]] || D["* " + r[0]])) {
                        !0 === J ? J = D[E] : !0 !== D[E] && (F = r[0], z.unshift(r[1]));
                        break;
                      }
                    }
                  }
                  if (!0 !== J) {
                    if (J && c["throws"]) {
                      I = J(I);
                    } else {
                      try {
                        I = J(I);
                      } catch (M) {
                        r = {state:"parsererror", error:J ? M : "No conversion from " + A + " to " + F};
                        break a;
                      }
                    }
                  }
                }
              }
            }
          }
          r = {state:"success", data:I};
        }
        if (h) {
          m.ifModified && ((K = x.getResponseHeader("Last-Modified")) && (d.lastModified[f] = K), (K = x.getResponseHeader("etag")) && (d.etag[f] = K)), 204 === a ? K = "nocontent" : 304 === a ? K = "notmodified" : (K = r.state, l = r.data, p = r.error, h = !p);
        } else {
          if (p = K, a || !K) {
            K = "error", 0 > a && (a = 0);
          }
        }
        x.status = a;
        x.statusText = (b || K) + "";
        h ? v.resolveWith(u, [l, K, x]) : v.rejectWith(u, [x, K, p]);
        x.statusCode(G);
        G = n;
        q && t.trigger(h ? "ajaxSuccess" : "ajaxError", [x, m, h ? l : p]);
        y.fireWith(u, [x, K]);
        q && (t.trigger("ajaxComplete", [x, m]), --d.active || d.event.trigger("ajaxStop"));
      }
    }
    "object" === typeof a && (b = a, a = n);
    b = b || {};
    var e, f, g, h, k, l, q, p, m = d.ajaxSetup({}, b), u = m.context || m, t = m.context && (u.nodeType || u.jquery) ? d(u) : d.event, v = d.Deferred(), y = d.Callbacks("once memory"), G = m.statusCode || {}, z = {}, C = {}, N = 0, O = "canceled", x = {readyState:0, getResponseHeader:function(a) {
      var b;
      if (2 === N) {
        if (!h) {
          for (h = {};b = mc.exec(g);) {
            h[b[1].toLowerCase()] = b[2];
          }
        }
        b = h[a.toLowerCase()];
      }
      return null == b ? null : b;
    }, getAllResponseHeaders:function() {
      return 2 === N ? g : null;
    }, setRequestHeader:function(a, b) {
      var c = a.toLowerCase();
      N || (a = C[c] = C[c] || a, z[a] = b);
      return this;
    }, overrideMimeType:function(a) {
      N || (m.mimeType = a);
      return this;
    }, statusCode:function(a) {
      var b;
      if (a) {
        if (2 > N) {
          for (b in a) {
            G[b] = [G[b], a[b]];
          }
        } else {
          x.always(a[x.status]);
        }
      }
      return this;
    }, abort:function(a) {
      a = a || O;
      e && e.abort(a);
      c(0, a);
      return this;
    }};
    v.promise(x).complete = y.add;
    x.success = x.done;
    x.error = x.fail;
    m.url = ((a || m.url || R) + "").replace(lc, "").replace(oc, Q[1] + "//");
    m.type = b.method || b.type || m.method || m.type;
    m.dataTypes = d.trim(m.dataType || "*").toLowerCase().match(M) || [""];
    null == m.crossDomain && (l = xb.exec(m.url.toLowerCase()), m.crossDomain = !(!l || l[1] === Q[1] && l[2] === Q[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (Q[3] || ("http:" === Q[1] ? "80" : "443"))));
    m.data && m.processData && "string" !== typeof m.data && (m.data = d.param(m.data, m.traditional));
    cb(zb, m, b, x);
    if (2 === N) {
      return x;
    }
    (q = m.global) && 0 === d.active++ && d.event.trigger("ajaxStart");
    m.type = m.type.toUpperCase();
    m.hasContent = !nc.test(m.type);
    f = m.url;
    m.hasContent || (m.data && (f = m.url += (La.test(f) ? "&" : "?") + m.data, delete m.data), !1 === m.cache && (m.url = wb.test(f) ? f.replace(wb, "$1_=" + Ka++) : f + (La.test(f) ? "&" : "?") + "_=" + Ka++));
    m.ifModified && (d.lastModified[f] && x.setRequestHeader("If-Modified-Since", d.lastModified[f]), d.etag[f] && x.setRequestHeader("If-None-Match", d.etag[f]));
    (m.data && m.hasContent && !1 !== m.contentType || b.contentType) && x.setRequestHeader("Content-Type", m.contentType);
    x.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Ab + "; q=0.01" : "") : m.accepts["*"]);
    for (p in m.headers) {
      x.setRequestHeader(p, m.headers[p]);
    }
    if (m.beforeSend && (!1 === m.beforeSend.call(u, x, m) || 2 === N)) {
      return x.abort();
    }
    O = "abort";
    for (p in{success:1, error:1, complete:1}) {
      x[p](m[p]);
    }
    if (e = cb(Ea, m, b, x)) {
      x.readyState = 1;
      q && t.trigger("ajaxSend", [x, m]);
      m.async && 0 < m.timeout && (k = setTimeout(function() {
        x.abort("timeout");
      }, m.timeout));
      try {
        N = 1, e.send(z, c);
      } catch (P) {
        if (2 > N) {
          c(-1, P);
        } else {
          throw P;
        }
      }
    } else {
      c(-1, "No Transport");
    }
    return x;
  }, getJSON:function(a, b, c) {
    return d.get(a, b, c, "json");
  }, getScript:function(a, b) {
    return d.get(a, n, b, "script");
  }});
  d.each(["get", "post"], function(a, b) {
    d[b] = function(a, e, f, g) {
      d.isFunction(e) && (g = g || f, f = e, e = n);
      return d.ajax({url:a, type:b, dataType:g, data:e, success:f});
    };
  });
  d.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents:{script:/(?:java|ecma)script/}, converters:{"text script":function(a) {
    d.globalEval(a);
    return a;
  }}});
  d.ajaxPrefilter("script", function(a) {
    a.cache === n && (a.cache = !1);
    a.crossDomain && (a.type = "GET");
  });
  d.ajaxTransport("script", function(a) {
    if (a.crossDomain) {
      var b, c;
      return{send:function(e, f) {
        b = d("<script>").prop({async:!0, charset:a.scriptCharset, src:a.url}).on("load error", c = function(a) {
          b.remove();
          c = null;
          a && f("error" === a.type ? 404 : 200, a.type);
        });
        t.head.appendChild(b[0]);
      }, abort:function() {
        c && c();
      }};
    }
  });
  var Bb = [], Ma = /(=)\?(?=&|$)|\?\?/;
  d.ajaxSetup({jsonp:"callback", jsonpCallback:function() {
    var a = Bb.pop() || d.expando + "_" + Ka++;
    this[a] = !0;
    return a;
  }});
  d.ajaxPrefilter("json jsonp", function(a, b, c) {
    var e, f, g, h = !1 !== a.jsonp && (Ma.test(a.url) ? "url" : "string" === typeof a.data && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && Ma.test(a.data) && "data");
    if (h || "jsonp" === a.dataTypes[0]) {
      return e = a.jsonpCallback = d.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, h ? a[h] = a[h].replace(Ma, "$1" + e) : !1 !== a.jsonp && (a.url += (La.test(a.url) ? "&" : "?") + a.jsonp + "=" + e), a.converters["script json"] = function() {
        g || d.error(e + " was not called");
        return g[0];
      }, a.dataTypes[0] = "json", f = v[e], v[e] = function() {
        g = arguments;
      }, c.always(function() {
        v[e] = f;
        a[e] && (a.jsonpCallback = b.jsonpCallback, Bb.push(e));
        g && d.isFunction(f) && f(g[0]);
        g = f = n;
      }), "script";
    }
  });
  d.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest;
    } catch (a) {
    }
  };
  var X = d.ajaxSettings.xhr(), pc = {0:200, 1223:204}, qc = 0, V = {};
  if (v.ActiveXObject) {
    d(v).on("unload", function() {
      for (var a in V) {
        V[a]();
      }
      V = n;
    });
  }
  d.support.cors = !!X && "withCredentials" in X;
  d.support.ajax = X = !!X;
  d.ajaxTransport(function(a) {
    var b;
    if (d.support.cors || X && !a.crossDomain) {
      return{send:function(c, d) {
        var f, g, h = a.xhr();
        h.open(a.type, a.url, a.async, a.username, a.password);
        if (a.xhrFields) {
          for (f in a.xhrFields) {
            h[f] = a.xhrFields[f];
          }
        }
        a.mimeType && h.overrideMimeType && h.overrideMimeType(a.mimeType);
        a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
        for (f in c) {
          h.setRequestHeader(f, c[f]);
        }
        b = function(a) {
          return function() {
            b && (delete V[g], b = h.onload = h.onerror = null, "abort" === a ? h.abort() : "error" === a ? d(h.status || 404, h.statusText) : d(pc[h.status] || h.status, h.statusText, "string" === typeof h.responseText ? {text:h.responseText} : n, h.getAllResponseHeaders()));
          };
        };
        h.onload = b();
        h.onerror = b("error");
        b = V[g = qc++] = b("abort");
        h.send(a.hasContent && a.data || null);
      }, abort:function() {
        b && b();
      }};
    }
  });
  var ba, ta, rc = /^(?:toggle|show|hide)$/, sc = new RegExp("^(?:([+-])=|)(" + ra + ")([a-z%]*)$", "i"), tc = /queueHooks$/, da = [function(a, b, c) {
    var e, f, g, h, k, l, q = this, r = a.style, m = {}, u = [], t = a.nodeType && Y(a);
    c.queue || (k = d._queueHooks(a, "fx"), null == k.unqueued && (k.unqueued = 0, l = k.empty.fire, k.empty.fire = function() {
      k.unqueued || l();
    }), k.unqueued++, q.always(function() {
      q.always(function() {
        k.unqueued--;
        d.queue(a, "fx").length || k.empty.fire();
      });
    }));
    1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [r.overflow, r.overflowX, r.overflowY], "inline" === d.css(a, "display") && "none" === d.css(a, "float") && (r.display = "inline-block"));
    c.overflow && (r.overflow = "hidden", q.always(function() {
      r.overflow = c.overflow[0];
      r.overflowX = c.overflow[1];
      r.overflowY = c.overflow[2];
    }));
    h = p.get(a, "fxshow");
    for (e in b) {
      if (g = b[e], rc.exec(g)) {
        delete b[e];
        f = f || "toggle" === g;
        if (g === (t ? "hide" : "show")) {
          if ("show" === g && h !== n && h[e] !== n) {
            t = !0;
          } else {
            continue;
          }
        }
        u.push(e);
      }
    }
    if (b = u.length) {
      for (h = p.get(a, "fxshow") || p.access(a, "fxshow", {}), ("hidden" in h) && (t = h.hidden), f && (h.hidden = !t), t ? d(a).show() : q.done(function() {
        d(a).hide();
      }), q.done(function() {
        var b;
        p.remove(a, "fxshow");
        for (b in m) {
          d.style(a, b, m[b]);
        }
      }), e = 0;e < b;e++) {
        f = u[e], g = q.createTween(f, t ? h[f] : 0), m[f] = h[f] || d.style(a, f), f in h || (h[f] = g.start, t && (g.end = g.start, g.start = "width" === f || "height" === f ? 1 : 0));
      }
    }
  }], ca = {"*":[function(a, b) {
    var c, e, f = this.createTween(a, b), g = sc.exec(b), h = f.cur(), k = +h || 0, l = 1, n = 20;
    if (g) {
      c = +g[2];
      e = g[3] || (d.cssNumber[a] ? "" : "px");
      if ("px" !== e && k) {
        k = d.css(f.elem, a, !0) || c || 1;
        do {
          l = l || ".5", k /= l, d.style(f.elem, a, k + e);
        } while (l !== (l = f.cur() / h) && 1 !== l && --n);
      }
      f.unit = e;
      f.start = k;
      f.end = g[1] ? k + (g[1] + 1) * c : c;
    }
    return f;
  }]};
  d.Animation = d.extend(eb, {tweener:function(a, b) {
    d.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
    for (var c, e = 0, f = a.length;e < f;e++) {
      c = a[e], ca[c] = ca[c] || [], ca[c].unshift(b);
    }
  }, prefilter:function(a, b) {
    b ? da.unshift(a) : da.push(a);
  }});
  d.Tween = z;
  z.prototype = {constructor:z, init:function(a, b, c, e, f, g) {
    this.elem = a;
    this.prop = c;
    this.easing = f || "swing";
    this.options = b;
    this.start = this.now = this.cur();
    this.end = e;
    this.unit = g || (d.cssNumber[c] ? "" : "px");
  }, cur:function() {
    var a = z.propHooks[this.prop];
    return a && a.get ? a.get(this) : z.propHooks._default.get(this);
  }, run:function(a) {
    var b, c = z.propHooks[this.prop];
    this.pos = this.options.duration ? b = d.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : b = a;
    this.now = (this.end - this.start) * b + this.start;
    this.options.step && this.options.step.call(this.elem, this.now, this);
    c && c.set ? c.set(this) : z.propHooks._default.set(this);
    return this;
  }};
  z.prototype.init.prototype = z.prototype;
  z.propHooks = {_default:{get:function(a) {
    return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (a = d.css(a.elem, a.prop, "")) && "auto" !== a ? a : 0 : a.elem[a.prop];
  }, set:function(a) {
    if (d.fx.step[a.prop]) {
      d.fx.step[a.prop](a);
    } else {
      a.elem.style && (null != a.elem.style[d.cssProps[a.prop]] || d.cssHooks[a.prop]) ? d.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
    }
  }}};
  z.propHooks.scrollTop = z.propHooks.scrollLeft = {set:function(a) {
    a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
  }};
  d.each(["toggle", "show", "hide"], function(a, b) {
    var c = d.fn[b];
    d.fn[b] = function(a, d, g) {
      return null == a || "boolean" === typeof a ? c.apply(this, arguments) : this.animate(na(b, !0), a, d, g);
    };
  });
  d.fn.extend({fadeTo:function(a, b, c, d) {
    return this.filter(Y).css("opacity", 0).show().end().animate({opacity:b}, a, c, d);
  }, animate:function(a, b, c, e) {
    var f = d.isEmptyObject(a), g = d.speed(b, c, e), h = function() {
      var b = eb(this, d.extend({}, a), g);
      h.finish = function() {
        b.stop(!0);
      };
      (f || p.get(this, "finish")) && b.stop(!0);
    };
    h.finish = h;
    return f || !1 === g.queue ? this.each(h) : this.queue(g.queue, h);
  }, stop:function(a, b, c) {
    var e = function(a) {
      var b = a.stop;
      delete a.stop;
      b(c);
    };
    "string" !== typeof a && (c = b, b = a, a = n);
    b && !1 !== a && this.queue(a || "fx", []);
    return this.each(function() {
      var b = !0, g = null != a && a + "queueHooks", h = d.timers, k = p.get(this);
      if (g) {
        k[g] && k[g].stop && e(k[g]);
      } else {
        for (g in k) {
          k[g] && k[g].stop && tc.test(g) && e(k[g]);
        }
      }
      for (g = h.length;g--;) {
        h[g].elem !== this || null != a && h[g].queue !== a || (h[g].anim.stop(c), b = !1, h.splice(g, 1));
      }
      !b && c || d.dequeue(this, a);
    });
  }, finish:function(a) {
    !1 !== a && (a = a || "fx");
    return this.each(function() {
      var b, c = p.get(this), e = c[a + "queue"];
      b = c[a + "queueHooks"];
      var f = d.timers, g = e ? e.length : 0;
      c.finish = !0;
      d.queue(this, a, []);
      b && b.cur && b.cur.finish && b.cur.finish.call(this);
      for (b = f.length;b--;) {
        f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
      }
      for (b = 0;b < g;b++) {
        e[b] && e[b].finish && e[b].finish.call(this);
      }
      delete c.finish;
    });
  }});
  d.each({slideDown:na("show"), slideUp:na("hide"), slideToggle:na("toggle"), fadeIn:{opacity:"show"}, fadeOut:{opacity:"hide"}, fadeToggle:{opacity:"toggle"}}, function(a, b) {
    d.fn[a] = function(a, d, f) {
      return this.animate(b, a, d, f);
    };
  });
  d.speed = function(a, b, c) {
    var e = a && "object" === typeof a ? d.extend({}, a) : {complete:c || !c && b || d.isFunction(a) && a, duration:a, easing:c && b || b && !d.isFunction(b) && b};
    e.duration = d.fx.off ? 0 : "number" === typeof e.duration ? e.duration : e.duration in d.fx.speeds ? d.fx.speeds[e.duration] : d.fx.speeds._default;
    if (null == e.queue || !0 === e.queue) {
      e.queue = "fx";
    }
    e.old = e.complete;
    e.complete = function() {
      d.isFunction(e.old) && e.old.call(this);
      e.queue && d.dequeue(this, e.queue);
    };
    return e;
  };
  d.easing = {linear:function(a) {
    return a;
  }, swing:function(a) {
    return.5 - Math.cos(a * Math.PI) / 2;
  }};
  d.timers = [];
  d.fx = z.prototype.init;
  d.fx.tick = function() {
    var a, b = d.timers, c = 0;
    for (ba = d.now();c < b.length;c++) {
      a = b[c], a() || b[c] !== a || b.splice(c--, 1);
    }
    b.length || d.fx.stop();
    ba = n;
  };
  d.fx.timer = function(a) {
    a() && d.timers.push(a) && d.fx.start();
  };
  d.fx.interval = 13;
  d.fx.start = function() {
    ta || (ta = setInterval(d.fx.tick, d.fx.interval));
  };
  d.fx.stop = function() {
    clearInterval(ta);
    ta = null;
  };
  d.fx.speeds = {slow:600, fast:200, _default:400};
  d.fx.step = {};
  d.expr && d.expr.filters && (d.expr.filters.animated = function(a) {
    return d.grep(d.timers, function(b) {
      return a === b.elem;
    }).length;
  });
  d.fn.offset = function(a) {
    if (arguments.length) {
      return a === n ? this : this.each(function(b) {
        d.offset.setOffset(this, a, b);
      });
    }
    var b, c;
    c = this[0];
    var e = {top:0, left:0}, f = c && c.ownerDocument;
    if (f) {
      b = f.documentElement;
      if (!d.contains(b, c)) {
        return e;
      }
      typeof c.getBoundingClientRect !== pa && (e = c.getBoundingClientRect());
      c = fb(f);
      return{top:e.top + c.pageYOffset - b.clientTop, left:e.left + c.pageXOffset - b.clientLeft};
    }
  };
  d.offset = {setOffset:function(a, b, c) {
    var e, f, g, h = d.css(a, "position"), k = d(a), l = {};
    "static" === h && (a.style.position = "relative");
    g = k.offset();
    f = d.css(a, "top");
    e = d.css(a, "left");
    ("absolute" === h || "fixed" === h) && -1 < (f + e).indexOf("auto") ? (e = k.position(), f = e.top, e = e.left) : (f = parseFloat(f) || 0, e = parseFloat(e) || 0);
    d.isFunction(b) && (b = b.call(a, c, g));
    null != b.top && (l.top = b.top - g.top + f);
    null != b.left && (l.left = b.left - g.left + e);
    "using" in b ? b.using.call(a, l) : k.css(l);
  }};
  d.fn.extend({position:function() {
    if (this[0]) {
      var a, b, c = this[0], e = {top:0, left:0};
      "fixed" === d.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), d.nodeName(a[0], "html") || (e = a.offset()), e.top += d.css(a[0], "borderTopWidth", !0), e.left += d.css(a[0], "borderLeftWidth", !0));
      return{top:b.top - e.top - d.css(c, "marginTop", !0), left:b.left - e.left - d.css(c, "marginLeft", !0)};
    }
  }, offsetParent:function() {
    return this.map(function() {
      for (var a = this.offsetParent || hb;a && !d.nodeName(a, "html") && "static" === d.css(a, "position");) {
        a = a.offsetParent;
      }
      return a || hb;
    });
  }});
  d.each({scrollLeft:"pageXOffset", scrollTop:"pageYOffset"}, function(a, b) {
    var c = "pageYOffset" === b;
    d.fn[a] = function(e) {
      return d.access(this, function(a, d, e) {
        var k = fb(a);
        if (e === n) {
          return k ? k[b] : a[d];
        }
        k ? k.scrollTo(c ? v.pageXOffset : e, c ? e : v.pageYOffset) : a[d] = e;
      }, a, e, arguments.length, null);
    };
  });
  d.each({Height:"height", Width:"width"}, function(a, b) {
    d.each({padding:"inner" + a, content:b, "":"outer" + a}, function(c, e) {
      d.fn[e] = function(e, g) {
        var h = arguments.length && (c || "boolean" !== typeof e), k = c || (!0 === e || !0 === g ? "margin" : "border");
        return d.access(this, function(b, c, e) {
          return d.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (c = b.documentElement, Math.max(b.body["scroll" + a], c["scroll" + a], b.body["offset" + a], c["offset" + a], c["client" + a])) : e === n ? d.css(b, c, k) : d.style(b, c, e, k);
        }, b, h ? e : n, h, null);
      };
    });
  });
  d.fn.size = function() {
    return this.length;
  };
  d.fn.andSelf = d.fn.addBack;
  "object" === typeof module && "object" === typeof module.exports ? module.exports = d : "function" === typeof define && define.amd && define("jquery", [], function() {
    return d;
  });
  "object" === typeof v && "object" === typeof v.document && (v.jQuery = v.$ = d);
})(window);