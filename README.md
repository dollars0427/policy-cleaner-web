# Policy-Cleaner-Web
The web verison of policy cleaner.

**Warning: Please don't run it on public server!**

Installation
---

Note: This requires Node.js v0.10 to run. If you had not install it , you can download it at http://nodejs.org/download/ . \

1.Download the policy-cleaner source or clone the git repository:
```bash
$ git clone git@github.com:dollars0427/policy-cleaner-web.git
```

2.Switch to the project root directory:
```bash
$ cd policy-cleaner-web
```
3.Install the dependencies: 
```bash
$ npm install
```

Configuration
---
1.Copy the configuration file and edit it: 

```bash
$ cp config.example.json config.json 
$ vi config.json

```json
{
    "server": {
        "port": "3000",
        "secret": "Use your own key!"
    },  

    "token":{
        "access_key":"your aws access key",
        "access_secret":"your aws access key secret"
    },  

    "log": {
        "access_log_path": "/var/clear-policy/access_log",
        "app_log_path": "/var/log/clear-policy/app_log"
    }   
}

```

Usage
---

1.Run app.js with this command: 

```bash
$ node app.js
```
Unit Test

You can run the unit-test of this project by using nodeunit.

1.Switch to the test directory . It is in the root directory of project.

cd ./test

2.Install the dependencies:

npm install

3.Copy the configuration file and edit it:

$ cp ./config/setting.example.json setting.json
$ vi setting.json

```json
{
    "token":{
        "access_key":"Your aws access key",
        "access_secret":"Your aws access secret"
    },  

    "policy":{
        "policy_name":"The name of test policy"
    }   
}
```

4.Edit the policy document file for testing:
$ cp ./config/document.example.json document.json
$ vi document.json

```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Sid": "Stmt1444985677000",
        "Effect": "Allow",
        "Action": [
            "s3:*"
        ],
        "Resource": [
            "arn:aws:s3:::test",
            "arn:aws:s3:::test/*",
        ]
    }]  
}

```

5.Run nodeunit to test each part:

#This is just an example!
nodeunit testcase.js

BUG
---
If there are any bug, please feel feel to open a issues.
