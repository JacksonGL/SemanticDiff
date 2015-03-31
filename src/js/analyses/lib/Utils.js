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

((function(sandbox) {
    util = {};

    util.CONSOLE_LOG = console.log;
    util.RANDOM = Math.random;
    util.DATE = Date;
    util.NOW = Date.now;
    var SPECIAL_PROP = sandbox.Constants.SPECIAL_PROP + "M";
    var HOP = sandbox.Constants.HOP;
    var objectId = 1;

    function createShadowObject(val) {
        var type = typeof val;
        if ((type === 'object' || type === 'function') && val !== null && !HOP(val, SPECIAL_PROP)) {
            if (Object && Object.defineProperty && typeof Object.defineProperty === 'function') {
                Object.defineProperty(val, SPECIAL_PROP, {
                    enumerable: false,
                    writable: true
                });
            }
            try {
                val[SPECIAL_PROP] = Object.create(null);
                val[SPECIAL_PROP][SPECIAL_PROP] = objectId;
                objectId = objectId + 2;
            } catch (e) {
                // cannot attach special field in some DOM Objects.  So ignore them.
            }
        }

    }

    sandbox.getShadowObject = function(val) {
        var value;
        createShadowObject(val);
        var type = typeof val;
        if ((type === 'object' || type === 'function') && val !== null && HOP(val, SPECIAL_PROP)) {
            value = val[SPECIAL_PROP];
        } else {
            value = undefined;
        }
        return value;
    };

    util.getFunName = function(f) {
        if (f) {
            var matchResult = f.toString().match(/function ([^(\s]*)/);
            if (matchResult) {
                return matchResult[1];
            }
        }
        return '[unknown]';
    }

    // return true if the parameter is a native function
    util.isNativeFun = function(f) {
        if (typeof f === 'function') {
            var str = f.toString();
            if (str.indexOf('{ [native code] }') >= 0) {
                return true;
            }
        }
        return false;
    };

    // check if a function is a DOM function
    util.isDOMFun = function(f) {
        if (typeof f === 'function') {
            var str = f.toString();
            if (str.indexOf('{ [native code] }') >= 0) {
                return true;
            }
        }
        return false;
    };

    util.isDOMElement = function(elem) {
        if (elem && elem.constructor) {
            var name = this.getFunName(elem.constructor);
            if (name.indexOf('HTML') >= 0) {
                return true;
            } else if (name.indexOf('CSSStyleDeclaration') >= 0) {
                return true;
            }
        }
        return false;
    };

    var funList = [
        // constructors
        Object, Array,
        Boolean, Number,
        RegExp, Date,
        JSON.stringify, JSON.parse,
        parseInt, parseFloat, isNaN,
        // RegExp methods
        RegExp.prototype.test,
        RegExp.prototype.exec,
        // object methdos
        Object.create,
        Object.defineProperty,
        Object.prototype.hasOwnProperty,
        // array methods
        Array.isArray,
        Array.prototype.sort,
        Array.prototype.slice,
        Array.prototype.splice,
        Array.prototype.lastIndexOf,
        Array.prototype.push,
        Array.prototype.pop,
        Array.prototype.join,
        Array.prototype.shift,
        Array.prototype.unshift,
        Array.prototype.concat,
        // Math methods
        Math.max, Math.min,
        Math.sin, Math.cos,
        Math.abs, Math.pow,
        Math.sqrt, Math.round,
        Math.floor,
        // string methods
        String.fromCharCode,
        String.prototype.trim,
        String.prototype.concat,
        String.prototype.replace,
        String.prototype.slice,
        String.prototype.split,
        String.prototype.match,
        String.prototype.substring,
        String.prototype.toLocaleUpperCase,
        String.prototype.toLocaleLowerCase,
        String.prototype.toUpperCase,
        String.prototype.toLowerCase,
        String.prototype.charAt,
        String.prototype.indexOf,
        String.prototype.lastIndexOf,
        String.prototype.charCodeAt,
        // Date methods
        Date.now,
        // console methods
        console.log,
        // typed array constructors
        ArrayBuffer,
        Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array
    ];

    util.isImportantNativeFun = function(f) {
        for (var i = 0; i < funList.length; i++) {
            if (funList[i] === f) {
                return false;
            }
        }
        return this.isNativeFun(f);
    };

    var prim = 1181;

    function simpleHash(str) {
        str = str + '';
        var result = 0;
        for (var i = 0; i < str.length; i += 11) {
            result += str.charCodeAt(i);
            result %= prim;
        }
        return result;
    }

    util.hash = function(obj) {
        return simpleHash(this.stringify(obj));
    };

    // a stringify object that handles circular references
    util.stringify = function(obj) {
        var objBuffer = [];

        function handler(key, value) {
            if (key === 'code' && typeof value === 'string') {
                return '[content skipped]';
            }
            if (key === 'J$') {
                return '[jalangi content skipped]';
            }
            if (key === 'pid') {
                return '[pid skipped]';
            }
            if (key === 'filename' && typeof value === 'string') {
                return '[file name skipped]';
            }
            if (key === 'argv' && typeof value === 'object' && Array.isArray(value)) {
                return '[argv skipped]';
            }
            if (typeof value === 'object' || typeof value === 'function') {
                for (var i = 0; i < objBuffer.length; i++) {
                    if (objBuffer[i] === value) {
                        // circular
                        return 'circular-' + i;
                    }
                }
                objBuffer.push(value);
            }
            return value;
        }
        return JSON.stringify(obj, handler, 2);
    };
    sandbox.Utils = util;
})(J$));