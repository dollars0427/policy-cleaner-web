'use strict';

var log4js = require('log4js');
var nconf = require('nconf');
var fs = require('fs');
var aws = require('aws-sdk');

var policy = require('../policy-cleaner-web/lib/policy');

var logger = log4js.getLogger('unit-test');

nconf.argv()
.env()
.file({file:'./config/setting.json'});

var awsConfig = nconf.get('token');
var policyConfig = nconf.get('policy');

var accessKey = awsConfig.access_key;
var accessSecert = awsConfig.access_secret;
var policyName = policyConfig.policy_name;
var policyDoc = fs.readFileSync('./config/document.json','utf8');
var policyArn = null;

aws.config.update({accessKeyId:accessKey, secretAccessKey:accessSecert});

var iam = new aws.IAM();

exports['Establish policy'] = {

    'Delete old policy': function(test){

        var params = {
            Scope:'Local'
        }
        policy.getPolicies(iam, params, function(err, data){

                logger.error('Error: ', err);

                for(var i = 0; i < data.length; i++){

                    var oldPolicyName = data[i].policyName;

                    if(oldPolicyName === policyName){
                        var params = {PolicyArn: data[i].policyArn};
                        policy.deletePolicy(iam, params, function(err){
                            test.equal(err, null, 'Should not had any error!');
                            test.done();
                        });
                    }

                    test.done();
                }
        });
    },

    'Create Policy': function(test){

        var params = {
            PolicyDocument: policyDoc,
            PolicyName: policyName
        }

        iam.createPolicy(params, function(err, data){

            logger.error('Error:', err);

            test.ok(err === null && data !== null , 'It should not return any error!');

            if(data){
                policyArn = data.Policy.Arn;
            }

            test.done();

        });
    }
},

exports['Test getPolicies'] = {

    'Test Get All Polices': function(test){

        var params = {
            Scope:'All',
            MaxItems:'5'
        }

        policy.getPolicies(iam, params, function(err, data){

            logger.error('Error: ', err);
            logger.debug('Result: ', data);

            test.equal(err, null, 'It should not return any error!');

            test.done();

        });
    },

    'Test Get AWS Polices':function(test){

        var params = {
            Scope:'AWS',
            MaxItems:'1'
        }

        policy.getPolicies(iam, params, function(err, data){

            logger.error('Error: ', err);
            logger.debug('Result ', data);

            test.equal(err, null, 'It should not return any error!');

            test.done();

        });
    },

    'Test Get Local Polices':function(test){

        var params = {
            Scope:'Local',
            MaxItems:'1'
        }

        policy.getPolicies(iam, params, function(err, data){

            logger.error('Error: ', err);
            logger.debug('Result ', data);

            test.equal(err, null, 'It should not return any error!');

            test.done();

        });
    },
},

exports['Test Delete Policy'] = function(test){

    var params = {PolicyArn: policyArn};

    policy.deletePolicy(iam, params, function(err){
            
        logger.error('Error: ', err);

        test.ok(err === null, 'It Should not return any error!');

        test.done();

    });

}
