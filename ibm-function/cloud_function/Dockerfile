FROM ibmfunctions/action-python-v3
USER root
COPY nightwatch/package.json /action/package.json
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs
RUN cd /action && npm install && npm install --save-dev nightwatch nightwatch-video-recorder nightwatch-record selenium-webdriver chromedriver
RUN curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
#COPY nightwatch/tests/ /action/tests
COPY nightwatch/nightwatch* /action/
COPY scripts/execute_test.sh /action/execute_test.sh
RUN chmod +x /action/execute_test.sh
ADD proxyfunction.py /action/proxyfunction.py
RUN echo '#!/bin/bash\n\
python /action/proxyfunction.py "$1"' > /action/exec
RUN chmod +x /action/exec

CMD ["/bin/bash", "-c", "cd actionProxy && python -u actionproxy.py"]