#!/bin/bash
OUTPUT_FOLDER=/action/tests_output/screenshots/*
timestamp=$(date +"%Y%m%d_%H%M")
export IBMCLOUD_REGION=$1
export IBMCLOUD_APIKEY=$2
export IBMCLOUD_BUCKET=$3
export SELENIUM_REMOTE_HOST=$4
export SELENIUM_REMOTE_PORT=$5
export NIGHTWATCH_TEST_PATH=$6


if [ -z $IBMCLOUD_APIKEY ] && [ -z $IBMCLOUD_BUCKET ]; then
  echo "***** No credentials Found to upload the results"
else
  echo "***** Logging to IBM Cloud"
  ibmcloud login --apikey "${IBMCLOUD_APIKEY}" -a "https://cloud.ibm.com" -r us-south
  sleep 30
  export COS_ADMIN_TOKEN=$(ibmcloud iam oauth-tokens | grep IAM | awk '{print($4)}')

  echo "***** PWD, cd action, ls"
  pwd && cd /action && ls -lrth 
    
  echo "***** Getting the Uploaded test"
  #curl "https://s3.${IBMCLOUD_REGION}.cloud-object-storage.appdomain.cloud/${IBMCLOUD_BUCKET}/${NIGHTWATCH_TEST_PATH}" \
  #   -H "Authorization: Bearer $COS_ADMIN_TOKEN"
  curl "https://s3.${IBMCLOUD_REGION}.cloud-object-storage.appdomain.cloud/${IBMCLOUD_BUCKET}/${NIGHTWATCH_TEST_PATH}" \
     -H "Authorization: Bearer $COS_ADMIN_TOKEN" > nightwatch-test-temp.js
  cat nightwatch-test-temp.js
  ls -lrth     
  cat nightwatch-test-temp.js | rev | cut -c 1- | rev > nightwatch-test.js
  
  echo "***** Copy test to NightwachFolder"
  mkdir -p /action/tests/
  cp nightwatch-test.js /action/tests/nightwatch-test.js
  ls /action/tests/nightwatch-test.js
  cat /action/tests/nightwatch-test.js

  echo "***** Starting Nightwatch Test"
  /action/node_modules/.bin/nightwatch

  echo "***** Uploading files"
  for file in $OUTPUT_FOLDER
  do
    echo "Processing $file file..."
    curl -X "PUT" "https://s3.${IBMCLOUD_REGION}.cloud-object-storage.appdomain.cloud/${IBMCLOUD_BUCKET}/${timestamp}${file}" \
         -H "x-amz-acl: public-read" \
         -H "Authorization: Bearer $COS_ADMIN_TOKEN" \
         -H "Content-Type: image/png" \
         -T $file
  done
fi
echo "***** Finished"