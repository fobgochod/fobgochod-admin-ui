#!/bin/sh
# build image
docker build -t fobgochod/fobgochod-admin-ui:1.0.0 .

# run container
docker rm -f fobgochod-admin-ui
docker run -idt --restart=always --privileged=true --name fobgochod-admin-ui \
-p 7002:80 \
fobgochod/fobgochod-admin-ui:1.0.0