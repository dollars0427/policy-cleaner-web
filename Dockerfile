FROM ubuntu:14.04
MAINTAINER Sardo Ip <sardo.ip@sardo.work>

RUN sed -i 's/archive.ubuntu.com/ubuntu.stu.edu.tw\/ubuntu/g' /etc/apt/sources.list

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y software-properties-common python-software-properties

RUN DEBIAN_FRONTEND=noninteractive add-apt-repository -y ppa:chris-lea/node.js

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y \
nodejs

RUN cd /opt && mkdir /opt/policy-cleaner/

ADD . /opt/policy-cleaner/

RUN cd /opt/policy-cleaner && npm install

RUN mkdir /var/log/policy-cleaner

RUN npm install -g forever

CMD forever /opt/policy-cleaner/app.js

EXPOSE 3000
