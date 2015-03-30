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

// do not remove the following comment
// JALANGI DO NOT INSTRUMENT

(function(sandbox) {
    function MyAnalysis() {
        var utils = sandbox.Utils;

        var objId = 1;
        var randomValue = 0.5;

        function setObjectId(val) {
            if (typeof val === 'object' || typeof val === 'function') {
                var sobj = sandbox.getShadowObject(val);
                // try to set obj Id
                if (sobj) {
                    if (!(sobj.id)) {
                        sobj.id = objId++;
                        // check if id has been successfully set
                        sobj = sandbox.getShadowObject(val);
                        // if object id is not succesuflly set
                        if (!(sobj && sobj.id === (objId - 1))) {
                            objId--;
                        }
                        return false;
                    }
                }
            }
            return true;
        }

        function getLocation(iid) {
            return sandbox.iidToLocation(sandbox.getGlobalIID(iid));
        }

        var nativeFunSamplingCnt = 0;
        var interval = 1;

        this.invokeFun = function(iid, f, base, args, result, isConstructor, isMethod) {
            if (f === utils.CONSOLE_LOG) {
                console.log('CONSOLE_LOG: ' + args[0]);
            }

            if (f === utils.RANDOM) {
                result = randomValue;
            }

            var set = true;
            if (isConstructor) {
                set = setObjectId(result);
            }
            //if(!set)
            //console.log(getLocation(iid));

            if (utils.isImportantNativeFun(f)) {
                if(f === Function.apply || f === Function.call) {
                    if(!utils.isImportantNativeFun(args[0]))
                        return {
                            result: result
                        };
                }
                //if ((--interval) <= 0) {
                //    nativeFunSamplingCnt++;
                //    interval = (Math.pow(1.1, nativeFunSamplingCnt) | 0);
                    // sample the current function invocation
                    // and the current program global state
                    console.log('fun-name:' + f.name);
                    console.log('args:');
                    console.log(utils.hash(args));
                    console.log('result:');
                    console.log(utils.hash(result));
                    console.log('gs: ' + utils.hash(global));
                //}
            }
            return {
                result: result
            };
        };

        this.literal = function(iid, val, hasGetterSetter) {
            var set = true;
            set = setObjectId(val);
            //if(!set)
            //console.log(getLocation(iid));
        };

        function getVal(val) {
            if (typeof val === 'string') {
                var sample = '';
                var sampleInterval = ((val.length / 10) | 0) + 1;
                // console.log(sampleInterval);
                if (val.length > 20) {
                    for (var i = 0; i < val.length; i += sampleInterval) {
                        sample = sample + val[i];
                    }
                    return sample;
                } else {
                    return val;
                }
            } else {
                var sobj = sandbox.getShadowObject(val);
                if (sobj) {
                    if (sobj.id) {
                        return '[obj-' + sobj.id + ']';
                    }
                }
                if (typeof val === 'number') {
                    return val;
                }
                return typeof val;
            }
        }

        //var sampleCnt = 5000;

        this.putField = function(iid, base, offset, val, isComputed, isOpAssign) {
            //if (typeof val !== 'function') {
            //    console.log('pf:' + offset + '=' + getVal(val));
            //}
            //if (sampleCnt-- <= 0)
            //    console.log(utils.hash(global));
            //console.log(global);
            //if (sampleCnt <= 0) {
            //    sampleCnt = 5000;
            //}
        };

        this.write = function(iid, name, val, lhs, isGlobal, isScriptLocal) {
            if (isGlobal) {
                console.log('wg:' + name);
                console.log('  v:' + getVal(val));
                console.log(utils.hash(global));
                //console.log(global);
            }
        };

        /*
        this.read = function(iid, name, val, isGlobal, isScriptLocal){return {result:val};};

        this.invokeFunPre = function(iid, f, base, args, isConstructor, isMethod){return {f:f,base:base,args:args,skip:false};};

        

        this.forinObject = function(iid, val){return {result:val};};

        this.declare = function (iid, name, val, isArgument, argumentIndex, isCatchParam){return {result:val};};

        this.getFieldPre = function(iid, base, offset, isComputed, isOpAssign, isMethodCall){return {base:base,offset:offset,skip:false};};

        this.getField = function(iid, base, offset, val, isComputed, isOpAssign, isMethodCall){return {result:val};};

        this.putFieldPre = function(iid, base, offset, val, isComputed, isOpAssign){return {base:base,offset:offset,val:val,skip:false};};

        this._return = function(iid, val){return {result:val};};

        this._throw = function(iid, val){return {result:val};};

        this.functionEnter = function (iid, f, dis, args){};

        this.functionExit = function(iid, returnVal, wrappedExceptionVal){return {returnVal:returnVal,wrappedExceptionVal:wrappedExceptionVal,isBacktrack:false};};

        this.scriptEnter = function(iid, instrumentedFileName, originalFileName){};

        this.scriptExit = function(iid, wrappedExceptionVal){return {wrappedExceptionVal:wrappedExceptionVal,isBacktrack:false};};

        this.binaryPre = function(iid, op, left, right, isOpAssign, isSwitchCaseComparison, isComputed){return {op:op,left:left,right:right,skip:false};};

        this.binary = function(iid, op, left, right, result, isOpAssign, isSwitchCaseComparison, isComputed){return {result:result};};

        this.unaryPre = function(iid, op, left) {return {op:op,left:left,skip:false};};

        this.unary = function(iid, op, left, result){return {result:result};};

        this.conditional = function(iid, result){return {result:result};};

        this.instrumentCodePre = function(iid, code){return {code:code,skip:false};};

        this.instrumentCode = function(iid, newCode, newAst){ return {result:newCode};};

        this.endExpression = function(iid) {};
        */

        this.endExecution = function() {
            //console.log(utils.hash(global));
            console.log(utils.stringify(global));
            console.log('endE');
        };

        /**
         * onReady is useful if your analysis is running on node.js (i.e., via the direct.js or jalangi.js commands)
         * and needs to complete some asynchronous initialization before the instrumented program starts.  In such a
         * case, once the initialization is complete, invoke the cb function to start execution of the instrumented
         * program.
         *
         * Note that this callback is not useful in the browser, as Jalangi has no control over when the
         * instrumented program runs there.
         * @param cb
         */
        this.onReady = function(cb) {
            cb();
        };
    }
    sandbox.analysis = new MyAnalysis();
})(J$);