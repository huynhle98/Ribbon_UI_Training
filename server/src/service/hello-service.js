const mbHelper = require('./mountebank-helper');
const settings = require('../settings');

function addService() {
    const response = { message: "hello world" }

    const stubs = [{
        predicates: [{
            equals: {
                method: "POST",
                "path": "/"
            }
        }],
        responses: [{
            is: {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
                    // "Access-Control-Allow-Headers": "${ALLOW-HEADERS}"
                },
                body: JSON.stringify(response),

            },
        }]
    }];

    const imposter = {
        port: settings.hello_service_port,
        protocol: 'http',
        name: 'hello',
        stubs: stubs,
        allowCORS: true
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };