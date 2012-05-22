# CI - with Jenkins

Using [Jenkins](http://jenkins-ci.org/) for continues integration with javascript.

## Mac OS X

For Jenkins you need Java and [Ant](http://ant.apache.org/). Ant can be replaced by make, rake, cake or another builder. In this example I'm using ant.

    brew install jsdoc-toolkit jscoverage phantomjs node curl
    
    curl http://npmjs.org/install.sh | sh
    
    npm install -g docco coffee-script

## Linux

    jsdoc-toolkit
    -------------
    download zip archive from: http://code.google.com/p/jsdoc-toolkit/downloads/list
    unpack
    move or copy to /usr/local/bin/

    jscoverage
    ----------
    download preferred archive from: http://siliconforks.com/jscoverage/download.html
    unpack, compile and install

    phantomjs
    ---------
    download preferred archive from: http://code.google.com/p/phantomjs/downloads/list
    unpack to selected destination
    link to /usr/local/bin: ln -s /path/to/download/bin/phantomjs /usr/local/bin/phantomjs

    node.js
    -------
    download archive from: http://nodejs.org
    unpack, compile and install

    curl
    ----
    yum install curl

    pygments - REQUIRED FOR docco!
    -----------------------------
    yum install pygments

    npm, docco, coffee-script
    -------------------------
    curl http://npmjs.org/install.sh | sh

    npm install -g docco coffee-script


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
    coffee -c tests/todoSpec.coffee app/todo.coffee
    
for development use:

    coffee -wc tests/todoSpec.coffee app/todo.coffee

## Run unit test in PhantomJS and generate junit.xml
    phantomjs.runner.sh junit_xml_reporter-build.html
    
## Code coverage 

I used jscoverage from this [project](https://github.com/moorinteractive/phantomjs-qunit-junit-jscoverage-cobertura.git) and make some changes to replace qunit with jasmine.

## Make documentation v [JSDoc](http://code.google.com/p/jsdoc-toolkit/)
    jsdoc todo.js -t=/usr/local/Cellar/jsdoc-toolkit/2.3.2/libexec/jsdoc-toolkit/templates/jsdoc -d=reports/doc
    
## Make documentation in [Docco](http://jashkenas.github.com/docco/)
    docco app/todo.coffee

## Ant script build.xml

    <project name="build" basedir="." default="default">

            <target name="default">
                    <antcall target="prepare" />
                    <antcall target="coverage" />
                    <antcall target="run" />
                    <antcall target="docs" />
            </target>

            <target name="prepare">
                <exec executable="phantomjs" failonerror="true">
                            <arg line="coverage.js" />
                            <arg line="prepare" />
                            <arg line="--config config.js" />
                </exec>
            </target>

            <target name="coverage">
                    <exec executable="jscoverage" failonerror="true">
                            <arg line="tmp/src" />
                            <arg line="tmp/bin" />
                    </exec>
            </target>

            <target name="run">
                    <exec executable="sh" failonerror="true">
                            <arg line="phantomjs.runner.sh" />
                            <arg line="junit_xml_reporter-build.html" />
                    </exec>
                    <exec executable="phantomjs" failonerror="true">
                            <arg line="coverage.js" />
                            <arg line="run" />
                            <arg line="--config config.js" />
                    </exec>
            </target>

            <target name="docs">
                <exec executable="jsdoc" failonerror="true">
                   <arg line="todo.manual.js" />
                   <arg line="-t=/usr/local/Cellar/jsdoc-toolkit/2.3.2/libexec/jsdoc-toolkit/templates/jsdoc" />
                   <arg line="-d=reports/docs" />
                </exec>
                <exec executable="/usr/local/bin/docco" failonerror="true">
                    <arg line="app/todo.coffee" />
                </exec>
            </target>

    </project>


## Ant script update for Linux:

There's only one change - jsdoc needs to be called different way:

    <target name="docs">
        <exec executable="java" failonerror="true">
            <arg line="-jar /usr/local/bin/jsdoc-toolkit/jsrun.jar /usr/local/bin/jsdoc-toolkit/app/run.js" />
            <arg line="-t=/usr/local/bin/jsdoc-toolkit/templates/jsdoc" />
            <arg line="-d=reports/docs" />
            <arg line="todo.manual.js" />
        </exec>
        <exec executable="/usr/local/bin/docco" failonerror="true">
            <arg line="app/todo.coffee" />
        </exec>
    </target>
    
## Jenkins

![jenkins](https://github.com/abtris/angular-todo-mongohq/raw/master/docs/angular-todo-mongohq.jpg)    
    
    