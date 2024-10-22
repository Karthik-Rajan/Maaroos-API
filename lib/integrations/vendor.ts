import { aws_lambda_nodejs as lambda } from "aws-cdk-lib";
import { lambdaProps } from "../../utils/helper";

/** Vendor List */
export const fetchPartnerLambda = (
  self: any,
  role: void
): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "fetchPartner", {
    ...lambdaProps(`fetchPartner.ts`, role),
  });

/** Vendor Detail */
export const fetchPartnerDetailLambda = (
  self: any,
  role: void
): lambda.NodejsFunction =>
  new lambda.NodejsFunction(self, "fetchPartnerDetail", {
    ...lambdaProps(`fetchPartnerDetail.ts`, role),
  });
