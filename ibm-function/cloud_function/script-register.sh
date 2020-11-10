#!/usr/bin/env bash

# Create/Replace the cloud function
# We set the maximum allowed timeout of 5 minutes:
ibmcloud fn action delete nightwatchfunction
ibmcloud fn action create nightwatchfunction --timeout 300000 --docker juanjosepb/nightwatchfunction