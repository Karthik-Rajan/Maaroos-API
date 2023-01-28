import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { lambdaFuncProps } from "../../utils/helper";

export const postSignUpConfirmation = (
  self: cdk.Stack,
  role: void
): lambda.Function =>
  new lambda.Function(self, "postSignUpConfirmation", {
    ...lambdaFuncProps(lambda, role),
    handler: "postSignUpConfirmation.handler",
  });

export const createAuthChallenge = (
  self: cdk.Stack,
  role: void
): lambda.Function =>
  new lambda.Function(self, "createAuth", {
    ...lambdaFuncProps(lambda, role),
    handler: "createAuth.handler",
  });

export const defineAuthChallenge = (
  self: cdk.Stack,
  role: void
): lambda.Function =>
  new lambda.Function(self, "defineAuth", {
    ...lambdaFuncProps(lambda, role),
    handler: "defineAuth.handler",
  });

export const verifyAuthChallenge = (
  self: cdk.Stack,
  role: void
): lambda.Function =>
  new lambda.Function(self, "verifyAuth", {
    ...lambdaFuncProps(lambda, role),
    handler: "verifyAuth.handler",
  });
