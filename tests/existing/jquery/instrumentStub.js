var testrunner = require("qunit");
var path = require("path");
// or use setup function
testrunner.setup({
	log: {
        // log assertions overview
        // assertions: true,
        // log expected and actual values for failed tests
        // errors: true,
        // log tests overview
        // tests: true,
        // log summary
        summary: true,
        // log global summary (all files)
        globalSummary: true,
        // log coverage
        coverage: true,
        // log global coverage (all files)
        globalCoverage: true,
        // log currently testing code file
        testing: true
    },
});

testrunner.run({
	deps: [
		path.resolve(process.cwd() + "/../jalangi2/" + "src/js/Constants.js"),
		path.resolve(process.cwd() + "/../jalangi2/" + "src/js/Config.js"),
		path.resolve(process.cwd() + "/../jalangi2/" + "src/js/instrument/astUtil.js"),
		path.resolve(process.cwd() + "/../jalangi2/" + "src/js/instrument/esnstrument.js"),
		path.resolve(process.cwd() + "/../jalangi2/" + "src/js/runtime/iidToLocation.js"),
		path.resolve(process.cwd() + "/../jalangi2/" + "src/js/runtime/analysis.js"),
		process.cwd() + "/src/js/analyses/lib/Utils.js",
		process.cwd() + "/src/js/analyses/traceRecorder.js"
	],
	code: process.cwd() + "/tests/existing/jquery/jquery-1.11.2.run.js",
	tests: process.cwd() + "/tests/existing/jquery/jquery-1.11.2_stub.js"
});