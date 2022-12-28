import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as iam from "@aws-cdk/aws-iam";
import { lambdaProps } from "../../utils/helper";

/** Vendor List */

export const fetchPartnerLambda = (
  self: cdk.Stack,
  role: void
): lambda.Function =>
  new lambda.Function(self, "fetchPartner", {
    ...lambdaProps(lambda, role),
    handler: "fetchpartner.handler",
  });

export const fetchPartnerApi = (
  self: cdk.Stack,
  role: void
): apigw.LambdaIntegration =>
  new apigw.LambdaIntegration(fetchPartnerLambda(self, role));

/** Vendor Detail */

export const fetchPartnerDetailLambda = (
  self: cdk.Stack,
  role: void
): lambda.Function =>
  new lambda.Function(self, "fetchPartnerDetail", {
    ...lambdaProps(lambda, role),
    handler: "fetchPartnerDetail.handler",
  });

export const fetchPartnerDetailApi = (
  self: cdk.Stack,
  role: void
): apigw.LambdaIntegration =>
  new apigw.LambdaIntegration(fetchPartnerDetailLambda(self, role));
