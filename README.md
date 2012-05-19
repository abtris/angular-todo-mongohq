# CI - with Jenkins

Using [Jenkins](http://jenkins-ci.org/) for continues integration with javascript.

## Javascript - AngularJS

We using [AngularJS](http://angularjs.org/) and write unit tests in [Jasmine](http://pivotal.github.com/jasmine/).

Example aplication ToDo App with [MongoHQ](https://mongohq.com) backend, integration via proxy.php

    <?php
    require_once __DIR__ .'/config.php';

    header('Content-type: application/json');
    $url = "https://api.mongohq.com/databases/mongo/collections/todo/documents?_apikey=" . MONGOHQ_API_KEY;

    $postData = file_get_contents("php://input");
    if (!empty($postData)) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST ,1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        curl_setopt($ch, CURLOPT_POSTFIELDS , $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION ,1);
        curl_setopt($ch, CURLOPT_HEADER , 1);
        echo curl_exec($ch);
    } else {
        echo file_get_contents($url);
    }

## [CoffeeScript](http://coffeescript.org/) compilation
    coffee -c app/todo.coffee
    
for development use:

    coffee -wc app/todo.coffee

## Run unit test in PhantomJS and generate junit.xml
    phantomjs.runner.sh junit_xml_reporter-build.html
    
## Code coverage 

I used jscoverage from this [project](https://github.com/moorinteractive/phantomjs-qunit-junit-jscoverage-cobertura.git) and make some changes to replace qunit with jasmine.

    ant build.xml

## Make documentation v [JSDoc](http://code.google.com/p/jsdoc-toolkit/)
    jsdoc todo.js -t=/usr/local/Cellar/jsdoc-toolkit/2.3.2/libexec/jsdoc-toolkit/templates/jsdoc -d=reports/doc
    
## Make documentation in [Docco](http://jashkenas.github.com/docco/)
    docco app/todo.coffee
    
## Jenkins

![jenkins](https://github.com/abtris/angular-todo-mongohq/raw/master/docs/angular-todo-mongohq.jpg)    
    
    