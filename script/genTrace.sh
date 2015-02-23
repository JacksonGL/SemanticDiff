#!/bin/bash

#
# Copyright (c) 2015, University of California, Berkeley
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice, this
# list of conditions and the following disclaimer.
# 2. Redistributions in binary form must reproduce the above copyright notice,
# this list of conditions and the following disclaimer in the documentation
# and/or other materials provided with the distribution.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
# ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
# ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
# The views and conclusions contained in the software and documentation are those
# of the authors and should not be interpreted as representing official policies,
# either expressed or implied, of the FreeBSD Project.
#

# author: Liang Gong (gongliang13@cs.berkeley.edu)

# back up the preivous results
mv orig_trace.txt orig_trace.bak.txt;
mv min_trace.txt min_trace.bak.txt;
mv simp_trace.txt simp_trace.bak.txt;
mv adv_trace.txt adv_trace.bak.txt;

# procedure that collects execution trace on one bechmark
# f: arg1 -> arg2
# arg1: name of benchmark
# arg2: location of benchmark
collect() {
    echo "$1"
    echo "collecting trace for original program:" "$1".js 
    # trace the original program
    node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2".js > orig_trace.txt
	echo "collecting trace for minified program:" "$1"_min.js 
	# trace simple minification (remove white spaces)
	node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2"_min.js > min_trace.txt
	echo "collecting trace for program with simple optimization:" "$1"_simp.js 
	# trace simple optimization
	node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2"_simp.js > simp_trace.txt
	# echo "collecting trace for program with advanced optimization:" "$1"_adv.js 
	# trace advanced optimization
	# node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2"_adv.js > adv_trace.txt
	
	# start differing traces
	echo "diff original trace and min trace"
	diff orig_trace.txt min_trace.txt
	echo "diff original trace and simple opt trace"
	diff orig_trace.txt simp_trace.txt
	# echo "diff original trace and advanced opt trace"
	# diff orig_trace.txt adv_trace.txt
}

: <<'END'
END

# tiny tests
# collect "test-1" "tests/tiny_tests/test_1"
collect "earley-boyer" "tests/tiny_tests/earley-boyer"
# collect "jquery" "tests/tiny_tests/jquery"
# collect "regexp" "tests/tiny_tests/regexp"

echo 'collecting complete'
