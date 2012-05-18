( function() {
	
	var report = {
		modules: {},
		time: 0,
		count: 0,
		passed: 0,
		failures: 0
	};
	
	var currentModuleName;
	var currentModuleStart;
	
	var currentTestName;
	var currentTestStart;
	
	window.getReport = function() {
		return report;
	};
	
	QUnit.moduleStart = function( module ) {
		currentModuleName = module.name;
		currentModuleStart = new Date();
		
		report.modules[ module.name ] = {
			tests:{},
			time: 0,
			count: 0,
			passed: 0,
			failures: 0
		};
	};
	
	QUnit.moduleDone = function( module ) {
		report.modules[ currentModuleName ].time = ( new Date()).getTime() - currentModuleStart.getTime();
	};
	
	QUnit.testStart = function( test ) {
		currentTestName = test.name;
		currentTestStart = new Date();
		
		report.modules[ currentModuleName ].tests[ test.name ] = {
			failures: [],
			time: 0,
			success: false
		};
	};
	
	QUnit.testDone = function( test ) {
		report.modules[ currentModuleName ].tests[ test.name ].time = ( new Date()).getTime() - currentTestStart.getTime();
		report.modules[ currentModuleName ].tests[ test.name ].success = ( test.failed ? false : true );
		
		report.modules[ currentModuleName ].count++;
		report.modules[ currentModuleName ].passed += ( !test.failed ? 1 : 0 );
		report.modules[ currentModuleName ].failures += ( test.failed ? 1 : 0 );
		
		report.time += report.modules[ currentModuleName ].tests[ test.name ].time;
		report.count++;
		report.passed += ( !test.failed ? 1 : 0 );
		report.failures += ( test.failed ? 1 : 0 );
	};
	
	QUnit.log = function( test ) {
		var length = report.modules[ currentModuleName ].tests[ currentTestName ].failures.length;
		
		if( !test.result ) {
			report.modules[ currentModuleName ].tests[ currentTestName ].failures[ length ] = {
				message: test.message,
				type: currentTestName
			};
			
			console.log( currentModuleName + "." +	currentTestName + " " + test.message + ": failed, expected " + test.expected + ", but was " + test.actual );
		}
		else {
			console.log( currentModuleName + "." +	currentTestName + " " + test.message + ": passed" );
		}
	};
	
} ());