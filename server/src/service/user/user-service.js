const mbHelper = require('../mountebank-helper');
const settings = require('../../settings');
const { ResponseModel } = require('../../model/helper/responseModel');

function login() {

    var resSuccess = new ResponseModel();
    resSuccess.status = {
        code: 0,
        message: "Login Success"
    };
    resSuccess.data = {};

    var resErr = new ResponseModel();
    resErr.status = {
        code: 0,
        message: "Login Fail"
    };
    resErr.data = {};

    const stubs = [{
            responses: [{
                is: {
                    statusCode: 200,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
                        // "Access-Control-Allow-Headers": "${ALLOW-HEADERS}"
                    },
                    body: JSON.stringify(resSuccess),

                },
            }],
            predicates: [{
                equals: {
                    method: "POST",
                    "path": "/login",
                    "body": {
                        "username": "admin"
                    }
                }
            }]
        },
        {
            predicates: [{
                equals: {
                    method: "POST",
                    "path": "/login",
                }
            }],
            responses: [{
                is: {
                    statusCode: 500,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
                        // "Access-Control-Allow-Headers": "${ALLOW-HEADERS}"
                    },
                    body: JSON.stringify(resErr),

                },
            }]
        }
    ];

    const imposter = {
        port: settings.user_port,
        protocol: 'http',
        name: 'login',
        stubs: stubs,
        allowCORS: true
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { login };