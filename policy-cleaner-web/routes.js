var express = require('express');
var log4js = require('log4js');
var aws = require('aws-sdk');
var nconf = require('nconf');

var policy = require(__dirname + '/lib/policy');

var logger = log4js.getLogger('Routes');
var router = express.Router();

var accessKey = nconf.get('token').access_key;
var accessSecert = nconf.get('token').access_secret;

aws.config.update({accessKeyId:accessKey, secretAccessKey:accessSecert});

function policyList(req, res){

    var iam = new aws.IAM();

    var params = {
        Scope:'All'
    }

    policy.getPolicies(iam, params, function(err, policies){

        if(err){
            logger.error(err, err.stack);
            res.render('policylist',{policies:null});
            return;
        }

        res.render('policylist', {policies:policies});
    });
}

function deletePolicies(req, res){

    var policies = req.body.policies;

    for(var i = 0; i < policies.length; i++;){

        var policyArn = policies[i].policyArn;

        var params = {PolicyArn:policyArn};

        policy.deletePolicies(params, function(err){

            if(err){
                logger.error(err, err.stack);
                return;
            }

            logger.info(policies[i].PolicyName + ' Deleted!');

        });
    }
}

router.get('/', policyList);

router.post('/delete', deletePolicies);

module.exports = router;
