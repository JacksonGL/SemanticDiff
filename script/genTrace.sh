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
    node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2".js > orig_trace.txt
	echo "collecting trace for minified program:" "$1"_min.js 
	# trace simple minification (remove white spaces)
	node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2"_min.js > min_trace.txt
	echo "collecting trace for program with simple optimization:" "$1"_simp.js 
	# trace simple optimization
	node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2"_simp.js > simp_trace.txt
	echo "collecting trace for program with advanced optimization:" "$1"_adv.js 
	# trace advanced optimization
	node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ../jalangi2/src/js/sample_analyses/ChainedAnalysesNoCheck.js --analysis src/js/analyses/lib/Utils.js --analysis src/js/analyses/traceRecorder.js "$2"_adv.js > adv_trace.txt
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
save() {
	mkdir tests/result/"$1"
	mkdir tests/result/"$1"/orig
	mkdir tests/result/"$1"/min
	mkdir tests/result/"$1"/simp
	mkdir tests/result/"$1"/adv
	# save original and minified source code
	cp "$2".js tests/result/"$1"/orig/"$1".js
	mv "$2"_min.js tests/result/"$1"/min/"$1"_min.js
	mv "$2"_simp.js tests/result/"$1"/simp/"$1"_simp.js
	mv "$2"_adv.js tests/result/"$1"/adv/"$1"_adv.js
	# save compiler message
	mv "$2"_min_compile_info.txt tests/result/"$1"/min/"$1"_min_compile_info.txt
	mv "$2"_simp_compile_info.txt tests/result/"$1"/simp/"$1"_simp_compile_info.txt
	mv "$2"_adv_compile_info.txt tests/result/"$1"/adv/"$1"_adv_compile_info.txt
	# save instrumented source code
	mv "$2"_jalangi_.js tests/result/"$1"/orig/"$1"_jalangi_.js
	mv "$2"_min_jalangi_.js tests/result/"$1"/min/"$1"_min_jalangi_.js
	mv "$2"_simp_jalangi_.js tests/result/"$1"/simp/"$1"_simp_jalangi_.js
	mv "$2"_adv_jalangi_.js tests/result/"$1"/adv/"$1"_adv_jalangi_.js
	# save instrumented source code sourcemap files
	mv "$2"_jalangi_.json tests/result/"$1"/orig/"$1"_jalangi_.json
	mv "$2"_min_jalangi_.json tests/result/"$1"/min/"$1"_min_jalangi_.json
	mv "$2"_simp_jalangi_.json tests/result/"$1"/simp/"$1"_simp_jalangi_.json
	mv "$2"_adv_jalangi_.json tests/result/"$1"/adv/"$1"_adv_jalangi_.json
	# save closure compiler sourcemap files
	mv "$2"_min_sourcemap.json tests/result/"$1"/min/"$1"_min_sourcemap.json
	mv "$2"_simp_sourcemap.json tests/result/"$1"/simp/"$1"_simp_sourcemap.json
	mv "$2"_adv_sourcemap.json tests/result/"$1"/adv/"$1"_adv_sourcemap.json
	# save traces
	mv ./orig_trace.txt tests/result/"$1"/orig/"$1"_trace.txt
	mv ./min_trace.txt tests/result/"$1"/min/"$1"_min_trace.txt
	mv ./simp_trace.txt tests/result/"$1"/simp/"$1"_simp_trace.txt
	mv ./adv_trace.txt tests/result/"$1"/adv/"$1"_adv_trace.txt
	# save diff results
	mv "$2"_min_diff.txt tests/result/"$1"/"$1"_min_diff.txt
	mv "$2"_simp_diff.txt tests/result/"$1"/"$1"_simp_diff.txt
	mv "$2"_adv_diff.txt tests/result/"$1"/"$1"_adv_diff.txt
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
	rm orig_trace.txt
	rm min_trace.txt
	rm simp_trace.txt
	rm adv_trace.txt
	rm tests/tiny_tests/*.json
	rm tests/tiny_tests/*_jalangi_.js
	rm tests/tiny_tests/*_min.js
	rm tests/tiny_tests/*_simp.js
	rm tests/tiny_tests/*_adv.js
}

# procedure that do experiment for one bechmark
# f: arg1 -> arg2 : Unit
# arg1: name of benchmark
# arg2: location of benchmark
runexp() {
    echo "$1"
    # compile the code
    compile "$1" "$2"
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

# tiny tests
# runexp "test_1" "tests/tiny_tests/test_1"
# runexp "test_2" "tests/tiny_tests/test_2"
# runexp "earley-boyer" "tests/tiny_tests/earley-boyer"
# runexp "regexp" "tests/tiny_tests/regexp"

jalangi_ver="";

# Google Octane
# runexp "Octane-Splay" "../jalangi2/tests/octane""$jalangi_ver""/splay"
# runexp "Octane-Richards" "../jalangi2/tests/octane""$jalangi_ver""/richards"
## runexp "Octane-DeltaBlue" "../jalangi2/tests/octane""$jalangi_ver""/deltablue"
# runexp "Octane-Crypto" "../jalangi2/tests/octane""$jalangi_ver""/crypto"
# runexp "Octane-Box2d" "../jalangi2/tests/octane""$jalangi_ver""/box2d"
# runexp "Octane-Code-Load" "../jalangi2/tests/octane""$jalangi_ver""/code-load"
# runexp "Octane-Gbemu" "../jalangi2/tests/octane""$jalangi_ver""/gbemu"
## runexp "Octane-Earley-Boyer" "../jalangi2/tests/octane""$jalangi_ver""/earley-boyer"
# runexp "Octane-Mandreel" "../jalangi2/tests/octane""$jalangi_ver""/mandreel"
## runexp "Octane-Navier-Stokes" "../jalangi2/tests/octane""$jalangi_ver""/navier-stokes"
# runexp "Octane-Pdfjs" "../jalangi2/tests/octane""$jalangi_ver""/pdfjs"
## runexp "Octane-Raytrace" "../jalangi2/tests/octane""$jalangi_ver""/raytrace"
## runexp "Octane-Regexp" "../jalangi2/tests/octane""$jalangi_ver""/regexp"
# runexp "Octane-Typescript" "../jalangi2/tests/octane""$jalangi_ver""/typescript"

# SunSpider
## runexp "SunSpider-3d-Cube" "../jalangi2/tests/sunspider1""$jalangi_ver""/3d-cube"
# runexp "SunSpider-3d-Morph" "../jalangi2/tests/sunspider1""$jalangi_ver""/3d-morph"
## runexp "SunSpider-3d-Raytrace" "../jalangi2/tests/sunspider1""$jalangi_ver""/3d-raytrace"
# runexp "SunSpider-Access-Binary-Trees" "../jalangi2/tests/sunspider1""$jalangi_ver""/access-binary-trees"
## runexp "SunSpider-Access-Fannkuch" "../jalangi2/tests/sunspider1""$jalangi_ver""/access-fannkuch"
# runexp "SunSpider-Access-Nbody" "../jalangi2/tests/sunspider1""$jalangi_ver""/access-nbody"
# runexp "SunSpider-Access-Nsieve" "../jalangi2/tests/sunspider1""$jalangi_ver""/access-nsieve"
# runexp "SunSpider-Bitops-3bit-Bits-in-Byte" "../jalangi2/tests/sunspider1""$jalangi_ver""/bitops-3bit-bits-in-byte"
# runexp "SunSpider-Bitops-Bits-in-Byte" "../jalangi2/tests/sunspider1""$jalangi_ver""/bitops-bits-in-byte"
## runexp "SunSpider-Bitops-Bitwise-And" "../jalangi2/tests/sunspider1""$jalangi_ver""/bitops-bitwise-and"
runexp "SunSpider-Bitops-Nsieve-Bits" "../jalangi2/tests/sunspider1""$jalangi_ver""/bitops-nsieve-bits"
runexp "SunSpider-Controlflow-Recursive" "../jalangi2/tests/sunspider1""$jalangi_ver""/controlflow-recursive"
runexp "SunSpider-Crypto-AES" "../jalangi2/tests/sunspider1""$jalangi_ver""/crypto-aes"
runexp "SunSpider-Crypto-MD5" "../jalangi2/tests/sunspider1""$jalangi_ver""/crypto-md5"
runexp "SunSpider-Crypto-SHA1" "../jalangi2/tests/sunspider1""$jalangi_ver""/crypto-sha1"
runexp "SunSpider-Date-Format-Tofte" "../jalangi2/tests/sunspider1""$jalangi_ver""/date-format-tofte"
runexp "SunSpider-Date-Format-Xparb" "../jalangi2/tests/sunspider1""$jalangi_ver""/date-format-xparb"
runexp "SunSpider-Math-Cordic" "../jalangi2/tests/sunspider1""$jalangi_ver""/math-cordic"
runexp "SunSpider-Math-Partial-Sums" "../jalangi2/tests/sunspider1""$jalangi_ver""/math-partial-sums"
runexp "SunSpider-Math-Spectral-Norm" "../jalangi2/tests/sunspider1""$jalangi_ver""/math-spectral-norm"
runexp "SunSpider-Regexp-DNA" "../jalangi2/tests/sunspider1""$jalangi_ver""/regexp-dna"
runexp "SunSpider-String-Base64" "../jalangi2/tests/sunspider1""$jalangi_ver""/string-base64"
runexp "SunSpider-String-Fasta" "../jalangi2/tests/sunspider1""$jalangi_ver""/string-fasta"
runexp "SunSpider-String-Tagcloud" "../jalangi2/tests/sunspider1""$jalangi_ver""/string-tagcloud"
runexp "SunSpider-String-Unpack-Code" "../jalangi2/tests/sunspider1""$jalangi_ver""/string-unpack-code"
runexp "SunSpider-String-Validate-Input" "../jalangi2/tests/sunspider1""$jalangi_ver""/string-validate-input"

echo 'data collecting complete'
