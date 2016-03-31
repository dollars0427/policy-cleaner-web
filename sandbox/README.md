Sandbox
---

This is a virtual environment for developer to testing the new code of policy cleaner.

Installation
---
1.Downloads Docker from https://www.docker.com/

2.Install docker.

4.Pull required images:
```bash
$ docker pull ubuntu:14.04
```

5.Build the docker images of sandbox:
```bash
docker build .
```



Usage
---

To running policy cleaner at sandbox, you can use these command:

```bash
$ docker run -i -t -v ~/policy-cleaner-web/:/opt/policy-cleaner-web -p 3000:3000 [the images id or tag]
# node /opt/policy-cleaner-web/policy-cleaner-web/app.js
```
