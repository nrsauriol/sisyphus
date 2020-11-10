## Change OWN_DOCKER_HUB_REPOSITORY by you oun repository to Upload the image.
## Have in mind only public repositories are allowed.

docker build --no-cache --tag nightwatch-function-local .
docker tag nightwatch-function-local:latest <OWN_DOCKER_HUB_REPOSITORY>/nightwatchfunction:latest
docker push <OWN_DOCKER_HUB_REPOSITORY>/nightwatchfunction:latest