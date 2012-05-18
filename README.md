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

## Coffee-script compilation
    coffee -c app/todo.coffee

## Run unit test in PhantomJS and generate junit.xml
    phantomjs.runner.sh junit_xml_reporter-build.html
    
## Code coverage (not working corectly now)
    ant

## Make documentation v JSDoc
    jsdoc todo.js -t=/usr/local/Cellar/jsdoc-toolkit/2.3.2/libexec/jsdoc-toolkit/templates/jsdoc -d=reports/doc
    
    