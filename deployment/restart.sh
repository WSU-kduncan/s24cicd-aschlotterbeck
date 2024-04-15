#! /bin/bash

# kill the old container process - stopped & then removed
docker stop baseballCaps
docker remove baseballCaps

# pull fresh image
docker pull aschlotterbeck/ceg3120:latest

# run new container by name, with restart automagic
docker run -d -p 80:80 --name baseballCaps --restart always aschlotterbeck/ceg3120:latest