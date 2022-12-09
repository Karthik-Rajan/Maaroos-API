import * as cdk from "@aws-cdk/core";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as iam from "@aws-cdk/aws-iam";

export const lambdaRole = (self: cdk.Stack) =>
  new iam.Role(self, "fetchPartners", {
    assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
  }).addManagedPolicy(
    iam.ManagedPolicy.fromAwsManagedPolicyName("AWSLambdaExecute")
  );

export const rootApi = (self: cdk.Stack): apigw.RestApi =>
  new apigw.RestApi(self, "v1", {
    restApiName: "Maaroos Version 1",
    description: "Maaroos API Version 1",
  });
