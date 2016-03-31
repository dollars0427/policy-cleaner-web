/*
 * Get Polices from AWS
 *
 * @param {object} iam
 * @param {object} params
 * @param {function} cb
 *
 */

function getPolicies(iam, params, cb){

    iam.listPolicies(params, function(err, data){

        if(err){
            cb(err, null);
            return;
        }

        var policies = [];

        for (var i = 0; i < data.Policies.length; i++){

            var policy = {
                'policyName':data.Policies[i].PolicyName, 
                'policyArn': data.Policies[i].Arn, 
                'createDate':data.Policies[i].CreateDate
            };

            policies.push(policy);
        }

        cb(null, policies);

    });
}

/*
 * Delete Polices from AWS
 *
 * @param {object} iam
 * @param {object} params
 * @param {function} cb
 *
 */

function deletePolicy(iam, params, cb){

    iam.deletePolicy(params, function(err, data){

        if(err){
            cb(err, null);
            return;
        }

        cb(null, data);

    });
}



module.exports = {
    getPolicies:getPolicies,
    deletePolicy:deletePolicy
}
