FROM ubuntu:14.04
MAINTAINER Sardo Ip <sardo.ip@sardo.work>

RUN sed -i 's/archive.ubuntu.com/ubuntu.stu.edu.tw\/ubuntu/g' /etc/apt/sources.list

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y software-properties-common python-software-properties

RUN DEBIAN_FRONTEND=noninteractive add-apt-repository -y ppa:chris-lea/node.js

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y \
nodejs

#Change the path if you changed the setting of policy-cleaner-web.
RUN mkdir /var/log/policy-cleaner

#Change the port if you changed the setting of policy-cleaner-web.
EXPOSE 3000
