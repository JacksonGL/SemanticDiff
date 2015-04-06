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

# procedure that fuzzes the benchmark programs
# f: arg1 -> arg2 : Unit
# arg1: name of benchmark
# arg2: location of benchmark
fuzz() {
	echo "fuzzing" "$1".js
	# node src/js/testGenerator/astProcess.js "$2".js randomMover "$2"-fuzzed.js
	node src/js/testGenerator/astProcess.js "$2".js carefulFuzzer "$2"-fuzzed.js
	# wrap fuzzed program with try..catch cause
	echo "try {" > tmp.js
	cat "$2"-fuzzed.js >> tmp.js
	# semantic_diff_observe_exception_happens is a global variable, 
	# writing to that variable triggers dummping the global state in semanticDiff analysis
	echo "} catch(semanticDiff_inserted_Exception) { semantic_diff_observe_exception_happens = true; console.log('exception thrown'); }" >> tmp.js
	mv tmp.js "$2"-fuzzed.js
}

# procedure that compiles the benchmark programs
# f: arg1 -> arg2 : Unit
# arg1: name of benchmark
# arg2: location of benchmark
compile() {
	echo "compiling" "$1".js " with WHITESPACE_ONLY mode"
	( java -jar thirdParty/closure/compiler.jar --compilation_level WHITESPACE_ONLY --create_source_map "$2"_min_sourcemap.json --js_output_file "$2"_min.js "$2".js ) 2> "$2"_min_compile_info.txt

	echo "compiling" "$1".js " with SIMPLE mode"
	( java -jar thirdParty/closure/compiler.jar --compilation_level SIMPLE --create_source_map "$2"_simp_sourcemap.json --js_output_file "$2"_simp.js "$2".js ) 2> "$2"_simp_compile_info.txt

	echo "compiling" "$1".js " with ADVANCED mode"
	( java -jar thirdParty/closure/compiler.jar --compilation_level ADVANCED --create_source_map "$2"_adv_sourcemap.json --js_output_file "$2"_adv.js "$2".js ) 2> "$2"_adv_compile_info.txt
}

# procedure that collects execution trace on one bechmark
# f: arg1 -> arg2 : Unit
# arg1: name of benchmark
# arg2: location of benchmark
collect() {
    # trace the original program
    echo "collecting trace for program:" "$1".js
    cp "$2".js "$2".run.js
    node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2".run.js > orig_trace.txt
	echo "collecting trace for minified program:" "$1"_min.js
	if ! [[ -f "$2"_min.js ]]; then
		echo "source file not found" > min_trace.txt
 	else
 		cp "$2"_min.js "$2".run.js
		# trace simple minification (remove white spaces)
		node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2".run.js > min_trace.txt
	fi ; 
	echo "collecting trace for program with simple optimization:" "$1"_simp.js
	if ! [[ -f "$2"_simp.js ]]; then
		echo "source file not found" > simp_trace.txt
 	else
 		cp "$2"_simp.js "$2".run.js
		# trace simple minification
		node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2".run.js > simp_trace.txt
	fi ;
	echo "collecting trace for program with advanced optimization:" "$1"_adv.js
	if ! [[ -f "$2"_adv.js ]]; then
		echo "source file not found" > adv_trace.txt
 	else
 		cp "$2"_adv.js "$2".run.js
		# trace advanced optimization
		node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2".run.js > adv_trace.txt
	fi ;
}

# procedure that collect diff information among traces
# f: arg1 -> arg2 : Unit
# arg1: name of benchmark
# arg2: location of benchmark
getDiff() {
	# start differing traces
	echo "diff original trace and min trace"
	diff orig_trace.txt min_trace.txt > "$2"_min_diff.txt
	echo "diff original trace and simple opt trace"
	diff orig_trace.txt simp_trace.txt > "$2"_simp_diff.txt
	echo "diff original trace and advanced opt trace"
	diff orig_trace.txt adv_trace.txt > "$2"_adv_diff.txt
}

# procedure that saves the result
# f: arg1 -> arg2 : Unit
# arg1: name of benchmark
# arg2: location of benchmark
# arg3: number of iteration
save() {
	dirname="$1"-"$3"
	mkdir tests/result/"$dirname"
	mkdir tests/result/"$dirname"/orig
	mkdir tests/result/"$dirname"/min
	mkdir tests/result/"$dirname"/simp
	mkdir tests/result/"$dirname"/adv
	# save original and minified source code
	cp "$2".js tests/result/"$dirname"/orig/"$1".js
	mv "$2"_min.js tests/result/"$dirname"/min/"$1"_min.js
	mv "$2"_simp.js tests/result/"$dirname"/simp/"$1"_simp.js
	mv "$2"_adv.js tests/result/"$dirname"/adv/"$1"_adv.js
	# save compiler message
	mv "$2"_min_compile_info.txt tests/result/"$dirname"/min/"$1"_min_compile_info.txt
	mv "$2"_simp_compile_info.txt tests/result/"$dirname"/simp/"$1"_simp_compile_info.txt
	mv "$2"_adv_compile_info.txt tests/result/"$dirname"/adv/"$1"_adv_compile_info.txt
	# save instrumented source code
	mv "$2"_jalangi_.js tests/result/"$dirname"/orig/"$1"_jalangi_.js
	mv "$2"_min_jalangi_.js tests/result/"$dirname"/min/"$1"_min_jalangi_.js
	mv "$2"_simp_jalangi_.js tests/result/"$dirname"/simp/"$1"_simp_jalangi_.js
	mv "$2"_adv_jalangi_.js tests/result/"$dirname"/adv/"$1"_adv_jalangi_.js
	# save instrumented source code sourcemap files
	mv "$2"_jalangi_.json tests/result/"$dirname"/orig/"$1"_jalangi_.json
	mv "$2"_min_jalangi_.json tests/result/"$dirname"/min/"$1"_min_jalangi_.json
	mv "$2"_simp_jalangi_.json tests/result/"$dirname"/simp/"$1"_simp_jalangi_.json
	mv "$2"_adv_jalangi_.json tests/result/"$dirname"/adv/"$1"_adv_jalangi_.json
	# save closure compiler sourcemap files
	mv "$2"_min_sourcemap.json tests/result/"$dirname"/min/"$1"_min_sourcemap.json
	mv "$2"_simp_sourcemap.json tests/result/"$dirname"/simp/"$1"_simp_sourcemap.json
	mv "$2"_adv_sourcemap.json tests/result/"$dirname"/adv/"$1"_adv_sourcemap.json
	# save traces
	mv ./orig_trace.txt tests/result/"$dirname"/orig/"$1"_trace.txt
	mv ./min_trace.txt tests/result/"$dirname"/min/"$1"_min_trace.txt
	mv ./simp_trace.txt tests/result/"$dirname"/simp/"$1"_simp_trace.txt
	mv ./adv_trace.txt tests/result/"$dirname"/adv/"$1"_adv_trace.txt
	# save diff results
	mv "$2"_min_diff.txt tests/result/"$dirname"/"$1"_min_diff.txt
	mv "$2"_simp_diff.txt tests/result/"$dirname"/"$1"_simp_diff.txt
	mv "$2"_adv_diff.txt tests/result/"$dirname"/"$1"_adv_diff.txt
}

# clean the previous intermediat files before experiment
clean() {
	# back up the result
	rm -Rf tests/result_bak/*
	rmdir tests/result_bak
	mv tests/result tests/result_bak
	mkdir tests/result
	# back up the preivous results
	# mv orig_trace.txt orig_trace.bak.txt;
	# mv min_trace.txt min_trace.bak.txt;
	# mv simp_trace.txt simp_trace.bak.txt;
	# mv adv_trace.txt adv_trace.bak.txt;
	intermediateClean
}

intermediateClean() {
	rm orig_trace.txt
	rm min_trace.txt
	rm simp_trace.txt
	rm adv_trace.txt
	rm tests/tiny_tests/*_info.txt
	rm tests/tiny_tests/*_diff.txt
	rm tests/tiny_tests/*.json
	rm tests/tiny_tests/*_jalangi_.js
	rm tests/tiny_tests/*_min.js
	rm tests/tiny_tests/*_simp.js
	rm tests/tiny_tests/*_adv.js
	rm tests/tiny_tests/*.run.js
}

# procedure that do experiment for one bechmark
# f: arg1 -> arg2 : Unit
# arg1: name of benchmark
# arg2: location of benchmark
# arg3: number of iteration
runexp() {
    echo "$1"
    # fuzz the code
    fuzz "$1" "$2"
    # compile the code
    compile "$1"-fuzzed "$2"-fuzzed
    # collect the execution trace
    collect "$1"-fuzzed "$2"-fuzzed
    # collect the diff information of the results
	getDiff "$1"-fuzzed "$2"-fuzzed
	# save the results if any of the following happens:
	# 1) there is a difference in the traces
 	if ! grep -q semantic_diff_observe_exception_happens orig_trace.txt; then
 		if [[ -s "$2"-fuzzed_min_diff.txt ]] || [[ -s "$2"-fuzzed_simp_diff.txt ]] || [[ -s "$2"-fuzzed_min_adv.txt ]]; then
 			# || ! [[ -s "$2"_min_compile_info.txt ]] || ! [[ -s "$2"_simp_compile_info.txt ]] || ! [[ -s "$2"_adv_compile_info.txt ]]
 			save "$1"-fuzzed "$2"-fuzzed "$3"
 			echo "<<<< traces are different >>>>"
 		else 
			echo "no difference"
 		fi ;
 	else
 		echo "fuzzed program get exception"
	fi ;
}

: <<'END'
END

# first do some cleaning
clean

# tiny tests
# runexp "test_1" "tests/tiny_tests/test_1"
# runexp "test_2" "tests/tiny_tests/test_2"
# runexp "earley-boyer" "tests/tiny_tests/earley-boyer"

# repeatedly fuzz this program and keeps all variants
# that has a difference in traces
for i in {1..10000}
do
   echo "---------""$i""-th round---------"
   # runexp "regexp" "tests/tiny_tests/regexp" "$i"
   # runexp "example1" "tests/tiny_tests/example1" "$i"
   runexp "access-body" "tests/tiny_tests/access-body" "$i"
   intermediateClean
done

jalangi_ver="";

echo 'data collecting complete'
