#!/bin/bash

# sanity check to make sure phantomjs exists in the PATH
hash /usr/bin/env phantomjs &> /dev/null
if [ $? -eq 1 ]; then
    echo "ERROR: phantomjs is not installed"
    echo "Please visit http://www.phantomjs.org/"
    exit 1
fi

# sanity check number of args
if [ $# -lt 1 ]
then
    echo "Usage: `basename $0` path_to_runner.html"
    echo
    exit 1
fi

SCRIPTDIR=$(dirname `perl -e 'use Cwd "abs_path";print abs_path(shift)' $0`)
TESTFILE=""
while (( "$#" )); do
    TESTFILE="$TESTFILE `perl -e 'use Cwd "abs_path";print abs_path(shift)' $1`"
    shift
done

# cleanup previous test runs
cd $SCRIPTDIR
# rm -f *.xml

# fire up the phantomjs environment and run the test
cd $SCRIPTDIR
/usr/bin/env phantomjs $SCRIPTDIR/phantomjs-testrunner.js $TESTFILE
