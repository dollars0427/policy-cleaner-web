var express = require('express');

var log4js = require('log4js');
var logger = log4js.getLogger('Routes');

var router = express.Router();

function policyList(req, res){

    res.render('policylist');

}

router.get('/', policyList);

module.exports = router;
