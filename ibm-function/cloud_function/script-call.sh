#!/usr/bin/env bash

# Call the cloud function with a SQL statement as parameter
# We use the -br parameter so that it is a blocking call and the function results
# get displayed on the console afterwards:
ibmcloud fn action invoke -br --result nightwatchfunction \
 --param-file parameters.json

# List the recent cloud function executions (a.k.a. activations):
ibmcloud fn activation list
sleep 60

# Get the recent cloud function logs to show the last could take some time.
ibmcloud fn activation logs $(ibmcloud fn activation list | head -2 | tail -1 | awk '{print $3}')

# Display the results of a specific previous cloud function run. You need to replace the
# ID with the activation ID of your choice:
#ibmcloud fn activation get b8696d16977f45e8a96d16977f95e804