import * as cdk from "@aws-cdk/core";
import CustomProps from "../utils/CustomProps";
import { fetchPartnerApi, fetchPartnerDetailApi } from "./integrations/vendor";
import { fetchUserApi, fetchUserSubscriptionApi } from "./integrations/user";
import { lambdaRole, rootApi } from "./integrations/base";
import vendor_R from "./routes/vendor";
import { userProfile_R, userFoodSubscription_R } from "./routes/user";
import * as Cognito from "@aws-cdk/aws-cognito";
import * as apigateway from "@aws-cdk/aws-apigateway";

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    const userPoolArn = cdk.Fn.importValue("userPool");

    /** Roles */
    let role = lambdaRole(this);

    /** API Integrations */
    let fetchPartner_I = fetchPartnerApi(this, role);

    let fetchPartnerDetail_I = fetchPartnerDetailApi(this, role);

    let fetchUser_I = fetchUserApi(this, role);

    let fetchUserFoodSubscription_I = fetchUserSubscriptionApi(this, role);

    /** User Auth Pool */
    const userPool = Cognito.UserPool.fromUserPoolArn(
      this,
      "UserPool",
      userPoolArn.toString()
    );

    const auth = new apigateway.CognitoUserPoolsAuthorizer(this, "userAuth", {
      cognitoUserPools: [userPool],
    });

    /** Routes */
    let api = rootApi(this);

    //Vendor
    let vendorIntegrations = {
      list: fetchPartner_I,
      vId: fetchPartnerDetail_I,
    };
    vendor_R(api, vendorIntegrations);

    //User
    userProfile_R(api, fetchUser_I, auth);

    userFoodSubscription_R(api, fetchUserFoodSubscription_I, auth);
  }
}
