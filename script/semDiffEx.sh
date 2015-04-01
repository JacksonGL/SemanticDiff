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

# procedure that collects execution trace on one bechmark
# f: arg1 -> arg2 : Unit
# arg1: name of benchmark
# arg2: location of benchmark
collect() {
	# collect the trace of the original program	
	echo "instrumenting program:" "$2".js
    node ../jalangi2/src/js/commands/esnstrument_cli.js --inlineIID "$2".js
	echo "collecting trace for program:" "$2".js
	# rename the instrumented file so that the global state is consistent
	cp "$2"_jalangi_.js "$2".run.js
	( node src/js/commands/directStub.js --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2"_stub.js ) >> orig_trace.txt
	rm "$2".run.js

	# collect the trace of the minified program provided by the vendor
	echo "instrumenting program:" "$2".js
    node ../jalangi2/src/js/commands/esnstrument_cli.js --inlineIID "$2".min.js
	echo "collecting trace for program:" "$2".min.js
	# rename the instrumented file so that the global state is consistent
	cp "$2".min_jalangi_.js "$2".run.js
	( node src/js/commands/directStub.js --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2"_stub.js ) >> min_trace.txt
}

# procedure that collect diff information among traces
# f: arg1 -> arg2 : Unit
# arg1: name of benchmark
# arg2: location of benchmark
getDiff() {
	# start differing traces
	echo "diff original trace and min trace"
	diff orig_trace.txt min_trace.txt > "$2"_min_diff.txt
}

# procedure that saves the result
# f: arg1 -> arg2 : Unit
# arg1: name of benchmark
# arg2: location of benchmark
save() {
	mkdir tests/result/"$1"
	mkdir tests/result/"$1"/orig
	mkdir tests/result/"$1"/min
	# save original and minified source code
	cp "$2".js tests/result/"$1"/orig/"$1".js
	cp "$2".min.js tests/result/"$1"/min/"$1".min.js
	# save instrumented source code
	mv "$2"_jalangi_.js tests/result/"$1"/orig/"$1"_jalangi_.js
	mv "$2".min_jalangi_.js tests/result/"$1"/min/"$1".min_jalangi_.js
	# save instrumented source code sourcemap files
	mv "$2"_jalangi_.json tests/result/"$1"/orig/"$1"_jalangi_.json
	mv "$2".min_jalangi_.json tests/result/"$1"/min/"$1".min_jalangi_.json
	# save traces
	mv ./orig_trace.txt tests/result/"$1"/orig/"$1"_trace.txt
	mv ./min_trace.txt tests/result/"$1"/min/"$1"_min_trace.txt
	# save diff results
	mv "$2"_min_diff.txt tests/result/"$1"/"$1"_min_diff.txt
}

# clean the previous intermediat files before experiment
clean() {
	# back up the result
	rm -Rf tests/result_bak/*
	rmdir tests/result_bak
	mv tests/result tests/result_bak
	mkdir tests/result
	rm orig_trace.txt
	rm min_trace.txt
}

# procedure that do experiment for one bechmark
# f: arg1 -> arg2 : Unit
# arg1: name of benchmark
# arg2: location of benchmark
runexp() {
    echo "$1"
    # collect the execution trace
    collect "$1" "$2"
    # collect the diff information of the results
	getDiff "$1" "$2"
	# save the results
	save "$1" "$2"
}

: <<'END'
END

# first do some cleaning
clean

jalangi_ver="";

# jQuery 1.11.2
# runexp "template" "tests/existing/template/template"
runexp "jQuery-1.11.2" "tests/existing/jquery/jquery-1.11.2"
# runexp "jQuery-UI" "tests/existing/jqueryUI/jquery-ui"

echo 'done'
