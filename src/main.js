/**
 * Main source code for your Lambda function, exposed via a default export.
 * Feel free to write your Lambda function in this file!
 */

import AWS from 'aws-sdk';
import request from 'jsonrequest';

/**
 * Write your Lambda function code here.
 *
 * @param {object} event    Lambda event object passed from the caller.
 * @param {object} context  Lambda context object (see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html).
 * @returns {*}             The return value will be passed to the caller.
 * @throws {Error}          If an Error is thrown, the Lambda will be considered failed; the error object will be passed to the caller.
 */
export default (event, context) => {
    // Example router.
    switch (event.type) {
        case 'rest-api-example':
            return restApiExample(event.data, context);
        case 'aws-sdk-example':
            return awsSdkExample(event.data, context);
    }
};

// Example function which uses async/await to perform a request to a REST API.
// This example uses the `jsonrequest` library, which supports Promises.
const restApiExample = async (data, context) => {
    const { user, repo } = data;

    // Make a REST API call to the GitHub API.
    const options = {
        url: `https://api.github.com/repos/${user}/${repo}`,
        headers: { 'User-Agent': 'AWS Lambda' },
    };

    // Await the Promise.
    return await request(options);
};

// Example function which invokes the AWS SDK, utilising `.promise()` for async/await.
const awsSdkExample = async (data, context) => {
    const EC2 = new AWS.EC2();

    // Sample EC2 call.
    return await EC2.describeInstances().promise();
};
