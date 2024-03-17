import { Stack, aws_lambda as lambda } from "aws-cdk-lib";
import { lambdaFuncProps } from "../../utils/helper";

export const postSignUpConfirmation = (
  self: Stack,
  role: void
): lambda.Function =>
  new lambda.Function(self, "postSignUpConfirmation", {
    ...lambdaFuncProps(lambda, role),
    handler: "postSignUpConfirmation.handler",
  });

export const createAuthChallenge = (
  self: Stack,
  role: void
): lambda.Function =>
  new lambda.Function(self, "createAuth", {
    ...lambdaFuncProps(lambda, role),
    handler: "createAuth.handler",
  });

export const defineAuthChallenge = (
  self: Stack,
  role: void
): lambda.Function =>
  new lambda.Function(self, "defineAuth", {
    ...lambdaFuncProps(lambda, role),
    handler: "defineAuth.handler",
  });

export const verifyAuthChallenge = (
  self: Stack,
  role: void
): lambda.Function =>
  new lambda.Function(self, "verifyAuth", {
    ...lambdaFuncProps(lambda, role),
    handler: "verifyAuth.handler",
  });
