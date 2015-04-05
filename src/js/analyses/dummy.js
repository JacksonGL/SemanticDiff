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
        
        var randomValue = 1;
        var fixedDateTick = 1000000000000;

        this.invokeFun = function(iid, f, base, args, result, isConstructor, isMethod) {

            if (f === utils.RANDOM) {
                result = randomValue;
                //randomValue *= 0.99;
            }

            if (f === utils.DATE) {
                result = new Date();
                result.setTime(fixedDateTick);
                //fixedDateTick += 1000;
            }

            if (f === utils.NOW) {
                result = fixedDateTick;
                //fixedDateTick += 1000;
            }

        };
    }
    sandbox.analysis = new MyAnalysis();
})(J$);