console.log('Loading a web page');
var page = new WebPage();
var url = "http://angular.dev/";
page.open(url, function (status) {
    var title = page.evaluate(function () {
         return document.title;
    });
    console.log('Page title is "' + title + '"');

    phantom.exit();
});