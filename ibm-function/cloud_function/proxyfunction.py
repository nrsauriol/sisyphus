# ------------------------------------------------------------------------------
# Copyright IBM Corp. 2018
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ------------------------------------------------------------------------------
#
# @param Cloud Functions actions accept a single parameter, which must be a JSON object.
#
# @return The output of this action, which must be a JSON object.
#
#
import sys
import json
import subprocess


args = json.loads(sys.argv[1])
ibmcloud_region = args.get("region", "")
ibmcloud_apikey = args.get("apikey", "")
ibmcloud_bucket = args.get("bucket_name", "")
selenium_host = args.get("host", "")
selenium_port = args.get("port", "")
nightwatch_path = args.get("test_path", "")


subprocess.check_call(['/action/execute_test.sh', str(ibmcloud_region[0]), str(ibmcloud_apikey[0]), str(ibmcloud_bucket[0]), str(selenium_host[0]), str(selenium_port[0]), str(nightwatch_path[0])])

result_json={'action_name': os.environ['__OW_ACTION_NAME']}
print(json.dumps(result_json))
