import * as cdk from "@aws-cdk/core";
import CustomProps from "../utils/CustomProps";
import { fetchPartnerApi, fetchPartnerDetailApi } from "./integrations/vendor";
import {
  postSignUpConfirmation,
  createAuthChallenge,
  defineAuthChallenge,
  verifyAuthChallenge,
} from "./integrations/auth";
import { fetchUserApi } from "./integrations/user";
import { lambdaRole, rootApi } from "./integrations/base";
import vendor_R from "./routes/vendor";
import userProfile_R from "./routes/user";
import * as Cognito from "@aws-cdk/aws-cognito";
import * as apigateway from "@aws-cdk/aws-apigateway";

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: CustomProps) {
    super(scope, id, props);

    console.log(props);

    const userPoolArn = cdk.Fn.importValue("userPool");

    /** Roles */
    let role = lambdaRole(this);
    // let smsRole = snsRole(this);

    /** API Integrations */
    let fetchPartner_I = fetchPartnerApi(this, role);

    let fetchPartnerDetail_I = fetchPartnerDetailApi(this, role);

    let fetchUser_I = fetchUserApi(this, role);

    /** Routes */
    let api = rootApi(this);

    const userPool = Cognito.UserPool.fromUserPoolArn(
      this,
      "UserPool",
      userPoolArn.toString()
    );

    const auth = new apigateway.CognitoUserPoolsAuthorizer(this, "userAuth", {
      cognitoUserPools: [userPool],
    });

    //Vendor
    let vendorIntegrations = {
      list: fetchPartner_I,
      vId: fetchPartnerDetail_I,
    };
    vendor_R(api, vendorIntegrations);

    //User
    let userIntegrations = {
      userSub: fetchUser_I,
    };
    userProfile_R(api, userIntegrations, auth);
  }
}
