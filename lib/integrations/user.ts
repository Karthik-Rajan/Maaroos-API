import { aws_lambda_nodejs as lambda } from "aws-cdk-lib";
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

export const rz_createOrderLambda = (self: any, role: void): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "rz_CreateOrder", {
    ...lambdaProps(`rz_CreateOrder.ts`, role),
  });

export const walletRechargeLambda = (self: any, role: void): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "walletRecharge", {
    ...lambdaProps(`walletRecharge.ts`, role),
  });

export const walletStatementLambda = (self: any, role: void): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "fetchStatement", {
    ...lambdaProps(`fetchStatement.ts`, role),
  });

export const paymentCallbackLambda = (self: any, role: void): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "paymentCallback", {
    ...lambdaProps(`paymentCallback.ts`, role),
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

export const addReviewLambda = (
  self: any,
  role: void
): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "addReview", {
    ...lambdaProps(`addReview.ts`, role),
  })

export const fetchReviewLambda = (
  self: any,
  role: void
): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "fetchReview", {
    ...lambdaProps(`fetchReview.ts`, role),
  })