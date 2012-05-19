console.log('Loading a web page');
var page = new WebPage();
var url = "junit_xml_reporter.html";
page.open(url, function (status) {
    var title = page.evaluate(function () {
         return document.title;
    });
    console.log('Page title is "' + title + '"');
    var el = document.getElementById( "runner passed" );
			// return ( el !== -1 );
	console.log(el);
    phantom.exit();
});