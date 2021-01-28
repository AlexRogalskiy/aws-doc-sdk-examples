/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/using-lambda-ddb-setup.html.

Purpose:
describe-stack-resources.ts demonstrates how display details for Amazon CloudFormation resources generated when you create an
Amazon CloudFormation stack using the Amazon Commmand Line Interface (CLI).
It is part of a tutorial demonstrating how create and deploy an Amazon Lambda function. To run the full tutorial, see
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/lambda-create-table-example.html.

*/
// snippet-start:[lambda.JavaScript.general-examples-lambda-create-function.describeResourcesV3]

// Load the required Node.js packages and modules.
const {
  CloudFormationClient,
  DescribeStackResourcesCommand,
} = require("@aws-sdk/client-cloudformation");

// Create an Amazon CloudFormation service client object.
const cloudformation = new CloudFormationClient();

// Set the parameters.
var params = {
  StackName: process.argv[2],
};

const getVariables = async () => {
  try {
    const data = await cloudformation.send(
      new DescribeStackResourcesCommand(params)
    );
    for (var i = 0; i < data.StackResources.length; i++) {
      var obj = data.StackResources[i].ResourceType;
      if (obj == "AWS::IAM::Policy") {
        const IDENTITY_POOL_ID = data.StackResources[i].LogicalResourceId;
        console.log("IDENTITY_POOL_ID:", IDENTITY_POOL_ID);
        var identity_pool_id = IDENTITY_POOL_ID;
      }
      if (obj == "AWS::S3::Bucket") {
        const BUCKET_NAME = data.StackResources[i].PhysicalResourceId;
        console.log("BUCKET_NAME:", BUCKET_NAME);
        var bucket = BUCKET_NAME;
      }
      if (obj == "AWS::IAM::Role") {
        const IAM_ROLE = data.StackResources[i].StackId;
        console.log("IAM_ROLE:", IAM_ROLE);
        var iam_role = IAM_ROLE;
      }
    }
  } catch (err) {
    console.log("Error", err);
  }
};
getVariables();
// snippet-start:[lambda.JavaScript.general-examples-lambda-create-function.describeResourcesV3]

