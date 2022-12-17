import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import { lambdaProps } from "../../utils/helper";

/** User */
export const fetchUserLambda = (self: cdk.Stack, role: void): lambda.Function =>
  new lambda.Function(self, "fetchUser", {
    ...lambdaProps(lambda, role),
    handler: "fetchUser.handler",
  });

export const fetchUserApi = (
  self: cdk.Stack,
  role: void
): apigw.LambdaIntegration =>
  new apigw.LambdaIntegration(fetchUserLambda(self, role));
