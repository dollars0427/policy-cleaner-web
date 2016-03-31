var express = require('express');
var log4js = require('log4js');
var aws = require('aws-sdk');
var nconf = require('nconf');

var policy = require(__dirname + '/lib/policy');

var logger = log4js.getLogger('APP_LOG');
var router = express.Router();

var accessKey = nconf.get('token').access_key;
var accessSecert = nconf.get('token').access_secret;

aws.config.update({accessKeyId:accessKey, secretAccessKey:accessSecert});

var iam = new aws.IAM();

function policyList(req, res){

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

    var postParams = 'policies[]'

    var policies = req.body[postParams];

    if(_checkArray(policies)){
        
        var datas = [];
        
        for(var i = 0; i < policies.length; i++){

            var policyArn = policies[i];

            var params = {PolicyArn:policyArn};

            policy.deletePolicy(iam, params, function(err, data){

                if(err){
                    logger.error(err, err.stack);
                    res.send({
                        error: err
                    });
                    return;
                }

                logger.info(data);
                
                datas.push(data);
            });
            
        }
        
        res.send({datas:datas});

        return;
    }

    var policyArn = policies;

    var params = {PolicyArn:policyArn};

    policy.deletePolicy(iam, params, function(err, data){

        if(err){
            logger.error(err, err.stack);
            res.send({
                error: err
            });
            return;
        }

        logger.info(data);
        res.send({data:data});
    });
}

function _checkArray(val){
     return(Object.prototype.toString.call(val)=== '[object Array]');
}

router.get('/', policyList);

router.post('/delete', deletePolicies);

module.exports = router;
