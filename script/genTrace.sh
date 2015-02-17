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
rm orig_trace.txt;
mv orig_trace.txt orig_trace.bak.txt;
rm min_trace.txt;
mv min_trace.txt min_trace.bak.txt;
rm simp_trace.txt;
mv simp_trace.txt simp_trace.bak.txt;


# procedure that collects results and timing on one bechmark
# f: arg1 -> arg2
# arg1: name of benchmark
# arg2: location of benchmark
runexp() {
    echo "$1"
    echo "collecting trace for original program:" "$1".js 
    # trace the original program
    node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2".js >> orig_trace.txt
	echo "collecting trace for minified program:" "$1"_min.js 
	# trace simple minification (remove white spaces)
	node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2"_min.js >> min_trace.txt
	echo "collecting trace for program with simple optimization:" "$1"_simp.js 
	# trace simple optimization
	node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2"_simp.js >> simp_trace.txt
}

: <<'END'
END

# Google Octane
runexp "test-1" "tests/tiny_tests/test_1"
# runexp "jquery" "tests/tiny_tests/jquery"

echo '[*]exp-done' >> result.txt