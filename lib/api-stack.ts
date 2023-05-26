import * as cdk from "@aws-cdk/core";
import CustomProps from "../utils/CustomProps";
import {
  fetchPartnerLambda,
  fetchPartnerDetailLambda,
} from "./integrations/vendor";
import {
  addScheduleLambda,
  fetchUserLambda,
  fetchUserSubscriptionLambda,
} from "./integrations/user";
import { lambdaRole, rootApi } from "./integrations/base";
import vendor_R from "./routes/vendor";
import { userProfile_R, userFoodSubscription_R, userAddSchedule_R } from "./routes/user";
import * as Cognito from "@aws-cdk/aws-cognito";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    const userPoolArn = cdk.Fn.importValue("userPool");

    /** Roles */
    let role = lambdaRole(this);

    /** API Integrations */
    let fetchPartner_I = fetchPartnerLambda(this, role);

    let fetchPartnerDetail_I = fetchPartnerDetailLambda(this, role);

    let fetchUser_I = fetchUserLambda(this, role);

    let fetchUserFoodSubscription_I = fetchUserSubscriptionLambda(this, role);

    let addSchedule_I = addScheduleLambda(this, role);

    /** User Auth Pool */
    const userPool = Cognito.UserPool.fromUserPoolArn(
      this,
      "UserPool",
      userPoolArn.toString()
    );

    /** Routes */
    const api = rootApi(this);
    new cdk.CfnOutput(this, "restApiName", {
      value: api.domainName?.domainNameAliasDomainName!,
      exportName: "restApiName",
    });
    new cdk.CfnOutput(this, "restApiZoneId", {
      value: api.domainName?.domainNameAliasHostedZoneId!,
      exportName: "restApiZoneId",
    });

    //Vendor
    let vendorIntegrations = {
      list: fetchPartner_I,
      detail: fetchPartnerDetail_I,
    };
    vendor_R(api, vendorIntegrations);

    const auth = new apigateway.CognitoUserPoolsAuthorizer(this, "userAuth", {
      cognitoUserPools: [userPool],
    });

    //User
    userProfile_R(api, fetchUser_I, auth);

    const foodSubscriptionRoot = userFoodSubscription_R(api, fetchUserFoodSubscription_I, auth);

    userAddSchedule_R(foodSubscriptionRoot, addSchedule_I, auth);
  }
}
