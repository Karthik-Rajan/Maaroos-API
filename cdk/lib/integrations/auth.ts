import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as iam from "@aws-cdk/aws-iam";
import { lambdaProps } from "../../utils/helper";

export const postSignUpConfirmation = (
  self: cdk.Stack,
  role: void
): lambda.Function =>
  new lambda.Function(self, "postSignUpConfirmation", {
    ...lambdaProps(lambda, role),
    handler: "postSignUpConfirmation.handler",
  });
