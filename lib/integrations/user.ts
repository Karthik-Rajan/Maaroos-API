import * as lambda from "@aws-cdk/aws-lambda-nodejs";
import { lambdaProps } from "../../utils/helper";

/** User */
export const fetchUserLambda = (self: any, role: void): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "fetchUser", {
    ...lambdaProps(`fetchUser.ts`, role),
  });
  
export const updateUserLambda = (self: any, role: void): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "updateUser", {
    ...lambdaProps(`updateUser.ts`, role),
  });

export const fetchUserSubscriptionLambda = (
  self: any,
  role: void
): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "fetchUserSubscription", {
    ...lambdaProps(`fetchUserSubscription.ts`, role),
  });

export const addScheduleLambda = (
  self: any,
  role: void
): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "addSchedule", {
    ...lambdaProps(`addSchedule.ts`, role),
  });
